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
  ],
})
export class AppointmentRegistrationComponent {
  pacienteId: string | null = null;
  searchTerm: string | any;
  pacientes: any[] = [];
  filteredPacientes: any[] = [];
  selectedPaciente: any;
  consultaId: string | null = null;
  formAppointment: FormGroup | any;
  constructor(
    private apiService: ApiService,
    private dateService: DateService,
    private ngZone: NgZone,
  ) {
    this.formAppointment = new FormGroup({
      pacienteId: new FormControl(''),
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

  onSelectPaciente(paciente: any) {
    this.selectedPaciente = paciente;
    this.pacienteId = paciente?.id;
    this.formAppointment.controls['pacienteId'].setValue(paciente?.id);
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
          this.formAppointment.controls['pacienteId'].setValue(this.pacienteId);
        } else {
          alert('Paciente não encontrado');
        }
      });
    }
  }
  
  onSubmit() {
    if (this.formAppointment.valid && this.selectedPaciente) {
      const tempPacienteId = this.formAppointment.get('pacienteId')?.value;
      this.apiService.create('consultas', this.formAppointment.value).subscribe(
        () => {
          alert('Consulta cadastrada com sucesso!');
          const pacienteId = this.formAppointment.get('pacienteId')?.value;
          this.formAppointment.reset();
          this.formAppointment.patchValue({ pacienteId: tempPacienteId });
          this.formAppointment.controls['dataConsulta'].setValue(this.dateService.formatDate(new Date()));
          this.formAppointment.controls['horarioConsulta'].setValue(this.dateService.formatTime(new Date()));
        },
        (error) => {
          console.error('Erro ao cadastrar consulta:', error);
        },
      );
    } else {
      alert('Por favor, preencha todos os campos obrigatórios do formulário.');
    }
  }
  
  onDelete() {
    if (this.formAppointment.valid && this.consultaId) {
      this.apiService.delete('consultas', this.consultaId).subscribe(
        () => {
          alert('Consulta deletada com sucesso!');
          this.formAppointment.reset();
        },
        (error) => {
          console.error('Erro ao deletar consulta:', error);
        },
      );
    } else {
      alert('Por favor, selecione uma consulta para deletar.');
    }
  }
  
  onUpdate() {
    if (this.formAppointment.valid && this.selectedPaciente) {
      if (this.consultaId !== null) {
        const updatedConsultation = {
          ...this.formAppointment.value,
          pacienteId: this.selectedPaciente.id,
        };
        this.apiService
          .update('consultas', this.consultaId, updatedConsultation)
          .subscribe(
            () => {
              alert('Consulta atualizada com sucesso!');
            },
            (error) => {
              console.error('Erro ao atualizar consulta:', error);
            },
          );
      } else {
        console.error('Erro: consultaId é null');
      }
    } else {
      alert(
        'Por favor, preencha todos os campos obrigatórios para atualização.',
      );
    }
  }
}