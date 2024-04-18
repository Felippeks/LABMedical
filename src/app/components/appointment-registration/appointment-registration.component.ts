import { Component } from '@angular/core';
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
import { Consulta } from '../home/medical.interfaces';
import { CpfPipe } from '../../pipes/cpf.pipe';
import { ModalService } from '../../services/modal/modal.service';
import { ModalComponent } from '../shareds_components/modal/modal.component';
@Component({
  selector: 'app-appointment-registration',
  standalone: true,
  templateUrl: './appointment-registration.component.html',
  styleUrl: './appointment-registration.component.scss',
  imports: [
    SidebarComponent,
    ToolbarComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    CpfPipe,
    ModalComponent
  ],
})
export class AppointmentRegistrationComponent {
  message: string | undefined;
  pacienteId: string | null = null;
  searchTerm: string | any;
  pacientes: any[] = [];
  consultas: any[] = [];
  filteredPacientes: any[] = [];
  selectedPaciente: any;
  consultaId: string | null = null;
  formAppointment: FormGroup | any;
  constructor(
    private apiService: ApiService,
    private dateService: DateService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
  
  ) {
    this.formAppointment = new FormGroup({
      pacienteId: new FormControl('',[Validators.required]),
      motivoConsulta: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      dataConsulta: new FormControl(
        this.dateService.formatDate(new Date()),
        Validators.required,
      ),
      horarioConsulta: new FormControl(
        this.dateService.formatTime(new Date()),
        Validators.required,
      ),
      descricaoProblema: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(1024),
      ]),
      medicacaoReceitada: new FormControl(''),
      dosagemPrecaucoes: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(256),
      ]),
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const consulta: Consulta = await this.apiService.get('consultas', id);
      this.consultaId = consulta.id;
      this.formAppointment.patchValue(consulta);
      this.formAppointment.controls['dataConsulta'].setValue(
        consulta.dataConsulta,
      );
      this.formAppointment.controls['horarioConsulta'].setValue(
        consulta.horarioConsulta,
      );
      this.pacienteId = consulta['pacienteId'];
      this.selectedPaciente = await this.apiService.get('pacientes', consulta['pacienteId']);
    }
  }

  onSelectPaciente(paciente: any) {
    this.selectedPaciente = paciente;
    this.pacienteId = paciente?.id;
    this.formAppointment.controls['pacienteId'].setValue(paciente?.id);
  }

  async onSearchTermChange() {
    if (this.searchTerm) {
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
        this.formAppointment.controls['pacienteId'].setValue(this.pacienteId);
      } else {
        this.modalService.setMessage('Paciente não encontrado');
        this.message = 'Paciente não encontrado';
      }
    }
  }

  async onSubmit() {
    if (!this.selectedPaciente) {
      this.modalService.setMessage('Por favor, selecione um paciente antes de cadastrar uma consulta.'); 
      this.message = 'Por favor, selecione um paciente antes de cadastrar uma consulta.';
      return;
    }

    if (this.formAppointment.valid) {
      try {
        await this.apiService.create('consultas', this.formAppointment.value);
        this.modalService.setMessage('Consulta cadastrada com sucesso!');
        this.message = 'Consulta cadastrada com sucesso!';
        const tempPacienteId = this.formAppointment.get('pacienteId')?.value;
        this.formAppointment.reset();
        this.formAppointment.patchValue({ pacienteId: tempPacienteId });
        this.formAppointment.controls['dataConsulta'].setValue(
          this.dateService.formatDate(new Date()),
        );
        this.formAppointment.controls['horarioConsulta'].setValue(
          this.dateService.formatTime(new Date()),
        );
      } catch (error) {
        console.error('Erro ao cadastrar consulta:', error);
      }
    } else {
      this.modalService.setMessage('Por favor, preencha todos os campos obrigatórios do formulário.');
      this.message = 'Por favor, preencha todos os campos obrigatórios do formulário.';
    }
  }
  async onDelete() {
    if (this.formAppointment.valid && this.consultaId) {
      try {
        await this.apiService.delete('consultas', this.consultaId);
        this.modalService.setMessage('Consulta deletada com sucesso!');
        this.message = 'Consulta deletada com sucesso!';
        this.formAppointment.reset();
      } catch (error) {
        console.error('Erro ao deletar consulta:', error);
      }
    } else {
      this.modalService.setMessage('Por favor, selecione uma consulta para deletar.');
      this.message = 'Por favor, selecione uma consulta para deletar.';
    }
  }
  
  async onUpdate() {
    if (this.formAppointment.valid && this.selectedPaciente) {
      if (this.consultaId !== null) {
        const updatedConsultation = {
          ...this.formAppointment.value,
          pacienteId: this.selectedPaciente.id,
        };
        try {
          await this.apiService.update('consultas', this.consultaId, updatedConsultation);
          this.modalService.setMessage('Consulta atualizada com sucesso!');
          this.message = 'Consulta atualizada com sucesso!';
        } catch (error) {
          console.error('Erro ao atualizar consulta:', error);
        }
      } else {
        console.error('Erro: consultaId é null');
      }
    } else {
      this.modalService.setMessage('Por favor, preencha todos os campos obrigatórios para atualização.');
      this.message = 'Por favor, preencha todos os campos obrigatórios para atualização.';
    }
  }
}
