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
  formAppointment: FormGroup;
  constructor(
    private apiService: ApiService,
    private dateService: DateService,
    private ngZone: NgZone,
  ) {
    this.formAppointment = new FormGroup({
      pacienteId: new FormControl(''),
      motivoConsulta: new FormControl('', Validators.required),
      dataConsulta: new FormControl(
        this.dateService.formatDate(new Date()),
        Validators.required,
      ),
      horarioConsulta: new FormControl(
        this.dateService.formatTime(new Date()),
        Validators.required,
      ),
      descricaoProblema: new FormControl('', Validators.required),
      medicacaoReceitada: new FormControl(''),
      dosagemPrecaucoes: new FormControl('', Validators.required),
    });
    this.getAllPacientes();
  }

  getAllPacientes() {
    this.apiService.getAll('pacientes').subscribe((data: any[]) => {
      this.pacientes = data;
      this.filteredPacientes = data;
    });
  }
  onSearchTermChange() {
  const tempPacienteId = this.formAppointment.get('pacienteId')?.value;

  const currentDate = this.dateService.formatDate(new Date());
  const currentTime = this.dateService.formatTime(new Date());
  this.formAppointment.reset();
  this.formAppointment.patchValue({ pacienteId: tempPacienteId });
  this.formAppointment.patchValue({ dataConsulta: currentDate, horarioConsulta: currentTime });
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
  
          if (this.pacienteId) {  
            this.apiService.getConsultasByPacienteId(this.pacienteId).subscribe((consultas: any[]) => {
              const consultaDoPaciente = consultas[0];
              if (consultaDoPaciente) {
                this.consultaId = consultaDoPaciente.id;
                const dataConsulta = this.dateService.formatDate(
                  this.dateService.parseDate(consultaDoPaciente.dataConsulta),
                );
                this.ngZone.run(() => {
                  this.formAppointment.patchValue({
                    motivoConsulta: consultaDoPaciente.motivoConsulta,
                    dataConsulta: this.dateService.formatDate(
                      new Date(consultaDoPaciente.dataConsulta),
                    ),
                    horarioConsulta: this.dateService.formatTime(
                      this.dateService.parseTime(consultaDoPaciente.horarioConsulta),
                    ),
                    descricaoProblema: consultaDoPaciente.descricaoProblema,
                    medicacaoReceitada: consultaDoPaciente.medicacaoReceitada,
                    dosagemPrecaucoes: consultaDoPaciente.dosagemPrecaucoes,
                  });
                });
              } else {
                alert('Cliente não possui consultas');
                return;
              }
            });
          }
        } else {
          alert('Paciente não encontrado');
        }
      });
    }
  }

  onSelectPaciente(paciente: any) {
    this.selectedPaciente = paciente;
    this.pacienteId = paciente?.id;
    this.formAppointment.controls['pacienteId'].setValue(paciente?.id);

    if (this.pacienteId) {
      this.apiService
        .getConsultasByPacienteId(this.pacienteId)
        .subscribe((consultas: any[]) => {
          const consultaDoPaciente = consultas[0];
          if (consultaDoPaciente) {
            this.consultaId = consultaDoPaciente.id;
            const dataConsulta = this.dateService.formatDate(
              this.dateService.parseDate(consultaDoPaciente.dataConsulta),
            );
            this.formAppointment.patchValue({
              motivoConsulta: consultaDoPaciente.motivoConsulta,
              dataConsulta: this.dateService.formatDate(
                new Date(consultaDoPaciente.dataConsulta),
              ),
              horarioConsulta: this.dateService.formatTime(
                this.dateService.parseTime(consultaDoPaciente.horarioConsulta),
              ),
              descricaoProblema: consultaDoPaciente.descricaoProblema,
              medicacaoReceitada: consultaDoPaciente.medicacaoReceitada,
              dosagemPrecaucoes: consultaDoPaciente.dosagemPrecaucoes,
            });
          } else {
            alert('Cliente não possui consultas');
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
