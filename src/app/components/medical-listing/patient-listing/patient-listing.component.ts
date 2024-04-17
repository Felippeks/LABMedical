import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../shareds_components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../shareds_components/toolbar/toolbar.component';
import { ApiService } from '../../../services/api/api.service';
import { Consulta, Exame, Paciente } from '../../home/medical.interfaces';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-medical-listing',
  standalone: true,
  templateUrl: './patient-listing.component.html',
  styleUrl: './patient-listing.component.scss',
  imports: [SidebarComponent, ToolbarComponent, CommonModule],
})
export class PatientMedicalListingComponent implements OnInit {
  paciente: any;
  consultas: any[] = [];
  exames: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('patientListing');
    if (id) {
      this.apiService.get('pacientes', id).subscribe((paciente) => {
        this.paciente = paciente;
      });
      this.apiService.getConsultasByPacienteId(id).subscribe((consultas) => {
        this.consultas = consultas;
      });
      this.apiService.getExamesByPacienteId(id).subscribe((exames) => {
        this.exames = exames;
      });
    }
  }
}