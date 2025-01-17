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
import { CpfPipe } from '../../pipes/cpf.pipe';
import { ModalService } from '../../services/modal/modal.service';
import { ModalComponent } from '../shareds_components/modal/modal.component';
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
    CpfPipe,
    ModalComponent,
  ],
})
export class ExamRegistrationComponent {
  message: string | undefined;
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
    private router: Router,
    private modalService: ModalService,
  ) {
    this.formExamRegistation = new FormGroup({
      pacienteId: new FormControl('', [Validators.required]),
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
      laboratorio: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      urlDocumento: new FormControl(''),
      resultadoExame: new FormControl('', [
        Validators.minLength(16),
        Validators.maxLength(1024),
      ]),
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        const exame: Exame = await this.apiService.get('exames', id);
        this.exameId = exame.id;
        this.formExamRegistation.patchValue(exame);
        this.formExamRegistation.controls['dataExame'].setValue(
          this.dateService.formatDate(new Date(exame.dataExame)),
        );
        this.formExamRegistation.controls['horarioExame'].setValue(
          exame.horarioExame,
        );
        this.pacienteId = exame['pacienteId'];
        const paciente: any = await this.apiService.get(
          'pacientes',
          exame['pacienteId'],
        );
        this.selectedPaciente = paciente;
      } catch (error) {
        console.error('Erro ao carregar exame:', error);
      }
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.modalService.setMessage(
        `Arquivo ${file.name} selecionado com sucesso!`,
      );
      this.message = `Arquivo ${file.name} selecionado com sucesso!`;
      this.generateUrlDocumento();
    }
  }

  generateUrlDocumento() {
    const urlDocumento =
      'http://exemplo.com/exames/' +
      Math.random().toString(36).substring(2, 15) +
      '.pdf';
    this.formExamRegistation.controls['urlDocumento'].setValue(urlDocumento);
  }

  onSelectPaciente(paciente: any) {
    this.selectedPaciente = paciente;
    this.pacienteId = paciente?.id;
    this.formExamRegistation.controls['pacienteId'].setValue(paciente?.id);
  }

  async onSearchTermChange() {
    if (this.searchTerm) {
      try {
        const pacientes: any[] = await this.apiService.getAll('pacientes');
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
            this.pacienteId,
          );
        } else {
          this.modalService.setMessage('Paciente não encontrado');
          this.message = 'Paciente não encontrado';
        }
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    }
  }

  async onSubmit() {
    if (!this.selectedPaciente) {
      this.modalService.setMessage(
        'Por favor, selecione um paciente para cadastrar o exame.',
      );
      this.message = 'Por favor, selecione um paciente para cadastrar o exame.';
      return;
    }
    if (this.formExamRegistation.valid) {
      this.generateUrlDocumento();
      const tempPacienteId = this.formExamRegistation.get('pacienteId')?.value;
      try {
        await this.apiService.create('exames', this.formExamRegistation.value);
        this.modalService.setMessage('Exame cadastrado com sucesso!');
        this.message = 'Exame cadastrado com sucesso!';
        const pacienteId = this.formExamRegistation.get('pacienteId')?.value;
        this.formExamRegistation.reset();
        this.formExamRegistation.patchValue({ pacienteId: tempPacienteId });
        this.formExamRegistation.controls['dataExame'].setValue(
          this.dateService.formatDate(new Date()),
        );
        this.formExamRegistation.controls['horarioExame'].setValue(
          this.dateService.formatTime(new Date()),
        );
      } catch (error) {
        console.error('Erro ao cadastrar exame:', error);
      }
    } else {
      this.modalService.setMessage(
        'Por favor, preencha todos os campos obrigatórios do formulário.',
      );
      this.message =
        'Por favor, preencha todos os campos obrigatórios do formulário.';
    }
  }

  async onDelete() {
    if (this.formExamRegistation.valid && this.exameId) {
      try {
        await this.apiService.delete('exames', this.exameId);
        this.modalService.setMessage('Exame deletado com sucesso!');
        this.message = 'Exame deletado com sucesso!';
        this.formExamRegistation.reset();
      } catch (error) {
        console.error('Erro ao deletar exame:', error);
      }
    } else {
      this.modalService.setMessage(
        'Por favor, selecione um exame para deletar.',
      );
      this.message = 'Por favor, selecione um exame para deletar.';
    }
  }

  async onUpdate() {
    if (this.formExamRegistation.valid && this.selectedPaciente) {
      if (this.exameId !== null) {
        const updateExame = {
          ...this.formExamRegistation.value,
          pacienteId: this.selectedPaciente.id,
        };
        try {
          await this.apiService.update('exames', this.exameId, updateExame);
          this.modalService.setMessage('Exame atualizado com sucesso!');
          this.message = 'Exame atualizado com sucesso!';
        } catch (error) {
          console.error('Erro ao atualizar exame:', error);
        }
      } else {
        console.error('Erro: exameId é null');
      }
    } else {
      this.modalService.setMessage(
        'Por favor, preencha todos os campos obrigatórios para atualização.',
      );
      this.message =
        'Por favor, preencha todos os campos obrigatórios para atualização.';
    }
  }
}
