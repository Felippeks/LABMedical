import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../shareds_components/sidebar/sidebar.component';
import { ToolbarComponent } from '../shareds_components/toolbar/toolbar.component';
import { ApiService } from '../../services/api/api.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateService } from '../../services/DataFormat/date.service';
import { NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exame } from '../home/medical.interfaces';
@Component({
  selector: 'app-exam-registration',
  standalone: true,
  templateUrl: './exam-registration.component.html',
  styleUrl: './exam-registration.component.scss',
  imports: [
    ToolbarComponent,
    SidebarComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
})
export class ExamRegistrationComponent {
  pacienteId: string | null = null;
  searchTerm: string | any;
  exameId: string | null = null;
  pacientes: any[] = [];
  filteredPacientes: any[] = [];
  selectedPaciente: any;
  formExamRegistation: FormGroup | any;

  constructor(
    private apiService: ApiService,
    private dateService: DateService,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formExamRegistation = new FormGroup({
      pacienteId: new FormControl(''),
      nomeExame: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      dataExame: new FormControl(
        this.dateService.formatDate(new Date()),
        Validators.required,
      ),
      horarioExame: new FormControl(
        this.dateService.formatTime(new Date()),
        Validators.required,
      ),
      tipoExame: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      laboratorio: new FormControl('', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(32)]),
      urlDocumento: new FormControl(''),
      resultadoExame: new FormControl('', [
        Validators.minLength(16),
        Validators.maxLength(1024),
      ]),
    });
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.apiService.get('exames', id).subscribe((exame: Exame) => {
        this.exameId = exame.id;
        this.formExamRegistation.patchValue(exame);
        this.formExamRegistation.controls['dataExame'].setValue(this.dateService.formatDate(new Date(exame.dataExame)));
        this.formExamRegistation.controls['horarioExame'].setValue(exame.horarioExame);
        this.pacienteId = exame['pacienteId'];
        this.apiService.get('pacientes', exame['pacienteId']).subscribe((paciente: any) => {
          this.selectedPaciente = paciente;
        });
      });
    }
  }


  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      alert(`Arquivo ${file.name} selecionado com sucesso!`);
      this.generateUrlDocumento();
    }
  }

  generateUrlDocumento() {
    const urlDocumento = 'http://exemplo.com/exames/' + Math.random().toString(36).substring(2, 15) + '.pdf';
    this.formExamRegistation.controls['urlDocumento'].setValue(urlDocumento);
  }

  nSelectPaciente(paciente: any) {
    this.selectedPaciente = paciente;
    this.pacienteId = paciente?.id;
    this.formExamRegistation.controls['pacienteId'].setValue(paciente?.id);
  }

  onSearchTermChange() {
    if (this.searchTerm) {
      this.apiService.getAll('pacientes').subscribe((pacientes: any[]) => {
        this.selectedPaciente = pacientes.find(
          (paciente) =>
            paciente.nome
              .trim()
              .toLowerCase()
              .includes(this.searchTerm.trim().toLowerCase()) ||
            paciente.cpf
              .trim()
              .toLowerCase()
              .includes(this.searchTerm.trim().toLowerCase()) ||
            paciente.email
              .trim()
              .toLowerCase()
              .includes(this.searchTerm.trim().toLowerCase()),
        );

        if (this.selectedPaciente) {
          this.pacienteId = this.selectedPaciente.id;
          this.formExamRegistation.controls['pacienteId'].setValue(
            this.pacienteId);                
        } else {
          alert('Paciente não encontrado');
        }
      });
    }
  }

  onSubmit() {
    if (this.formExamRegistation.valid && this.selectedPaciente) {
      this.generateUrlDocumento();
      const tempPacienteId = this.formExamRegistation.get('pacienteId')?.value;
      this.apiService.create('exames', this.formExamRegistation.value).subscribe(
          () => {
            alert('Exame cadastrado com sucesso!');
            const pacienteId = this.formExamRegistation.get('pacienteId')?.value;
            this.formExamRegistation.reset();
            this.formExamRegistation.patchValue({ pacienteId: tempPacienteId });
            this.formExamRegistation.controls['dataExame'].setValue(this.dateService.formatDate(new Date()));
            this.formExamRegistation.controls['horarioExame'].setValue(this.dateService.formatTime(new Date()));
          },
          (error) => {
            console.error('Erro ao cadastrar exame:', error);
          },
        );
    } else {
      alert('Por favor, preencha todos os campos obrigatórios do formulário.');
    }
  }

  onDelete() {
    if (this.formExamRegistation.valid && this.exameId) {
      this.apiService.delete('exames', this.exameId).subscribe(
        () => {
          alert('Exame deletado com sucesso!');
          this.formExamRegistation.reset();
        },
        (error) => {
          console.error('Erro ao deletar exame:', error);
        },
      );
    } else {
      alert('Por favor, selecione um exame para deletar.');
    }
  }

  onUpdate() {
    if (this.formExamRegistation.valid && this.selectedPaciente) {
      if (this.exameId !== null) {
        const updateExame = {
          ...this.formExamRegistation.value,
          pacienteId: this.selectedPaciente.id,
        };
        this.apiService.update('exames', this.exameId, updateExame).subscribe(
          () => {
            alert('Exame atualizado com sucesso!');
          },
          (error) => {
            console.error('Erro ao atualizar exame:', error);
          },
        );
      } else {
        console.error('Erro: exameId é null');
      }
    } else {
      alert(
        'Por favor, preencha todos os campos obrigatórios para atualização.',
      );
    }
  }
}
