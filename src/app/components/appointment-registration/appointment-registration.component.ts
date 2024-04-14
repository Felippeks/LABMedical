import { ChangeDetectorRef, Component } from '@angular/core';
import { SidebarComponent } from '../shareds_components/sidebar/sidebar.component';
import { ToolbarComponent } from '../shareds_components/toolbar/toolbar.component';
import { ApiService } from '../../services/api/api.service';
import { StateManagementService } from '../../services/StateManagementService/state-management.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
  isDeleting: boolean = false;
  isEditing: boolean = false;
  searchTerm: string | any;
  pacientes: any[] = [];
  filteredPacientes: any[] = [];
  selectedPaciente: any;

  formAppointment: FormGroup;

  constructor(
    private apiService: ApiService,
    private stateManagementService: StateManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.formAppointment = new FormGroup({
      pacienteId: new FormControl('', Validators.required),
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
      this.filteredPacientes = this.pacientes.filter(
        (paciente) =>
          paciente &&
          (paciente.nome &&
            paciente.nome.trim().toLowerCase().includes(this.searchTerm.trim().toLowerCase())) ||
          (paciente.telefone &&
            paciente.telefone.trim().toLowerCase().includes(this.searchTerm.trim().toLowerCase())) ||
          (paciente.email &&
            paciente.email.trim().toLowerCase().includes(this.searchTerm.trim().toLowerCase()))
      );
      this.selectedPaciente = this.filteredPacientes[0]; 
    } else {
      this.filteredPacientes = this.pacientes;
      this.selectedPaciente = this.pacientes[0]; 
    }
    this.cdr.detectChanges();
  }
  
  
  onSelectPaciente(paciente: any) {
    this.selectedPaciente = paciente;
    this.formAppointment.controls['pacienteId'].setValue(paciente?.id);
    console.log('Paciente selecionado:', this.selectedPaciente); 
  }
}  
