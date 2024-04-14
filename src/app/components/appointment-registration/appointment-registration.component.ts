import {  Component } from '@angular/core';
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
  isDeleting: boolean = false;
  isEditing: boolean = false;
  searchTerm: string | any;
  pacientes: any[] = [];
  filteredPacientes: any[] = [];
  selectedPaciente: any;

  formAppointment: FormGroup;
  constructor(private apiService: ApiService) {
    this.formAppointment = new FormGroup({
      pacienteId: new FormControl(''),
      motivoConsulta: new FormControl('', Validators.required),
      dataConsulta: new FormControl(new Date(), Validators.required),
      horarioConsulta: new FormControl(
        new Date().getTime(),
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
          this.apiService.getAll('consultas').subscribe((consultas: any[]) => {
            const consultaDoPaciente = consultas.find(
              (consulta) => consulta.pacienteId === this.selectedPaciente.id,
            );
            if (consultaDoPaciente) {
              this.formAppointment.patchValue({
                motivoConsulta: consultaDoPaciente.motivoConsulta,
                dataConsulta: new Date(consultaDoPaciente.dataConsulta),
                horarioConsulta: new Date(
                  consultaDoPaciente.horarioConsulta,
                ).getTime(),
                descricaoProblema: consultaDoPaciente.descricaoProblema,
                medicacaoReceitada: consultaDoPaciente.medicacaoReceitada,
                dosagemPrecaucoes: consultaDoPaciente.dosagemPrecaucoes,
              });
            } else {
              alert('Cliente não possui consultas');
              const pacienteId = this.formAppointment.get('pacienteId')?.value;
              this.formAppointment.reset();
              this.formAppointment.patchValue({ pacienteId });
            }
          });
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
    this.apiService.getAll('consultas').subscribe((consultas: any[]) => {
      const consultaDoPaciente = consultas.find(
        (consulta) => consulta.pacienteId === paciente.id,
      );
      if (consultaDoPaciente) {
        this.formAppointment.patchValue({
          motivoConsulta: consultaDoPaciente.motivoConsulta,
          dataConsulta: new Date(consultaDoPaciente.dataConsulta),
          horarioConsulta: new Date(
            consultaDoPaciente.horarioConsulta,
          ).getTime(),
          descricaoProblema: consultaDoPaciente.descricaoProblema,
          medicacaoReceitada: consultaDoPaciente.medicacaoReceitada,
          dosagemPrecaucoes: consultaDoPaciente.dosagemPrecaucoes,
        });
      } else {
        alert('Cliente não possui consultas');
      }
    });
  }

  onSubmit() {
    if (this.formAppointment.valid) {
      this.formAppointment.get('pacienteId')?.setValue(this.pacienteId);
      this.apiService.create('consultas', this.formAppointment.value).subscribe(
        () => {
          alert('Consulta cadastrada com sucesso!');
          const pacienteId = this.formAppointment.get('pacienteId')?.value;
          this.formAppointment.reset();
          this.formAppointment.patchValue({ pacienteId });
        },
        (error) => {
          console.error('Erro ao cadastrar consulta:', error);
        },
      );
    } else {
      alert('Por favor, preencha todos os campos obrigatórios do formulário.');
    }
  }
}
