import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../shareds_components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../shareds_components/toolbar/toolbar.component';
import { ApiService } from '../../../services/api/api.service';
import { Consulta, Exame, Paciente } from '../../home/medical.interfaces';

import { ActivatedRoute, Router } from '@angular/router';
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
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.get('pacientes', id).subscribe((paciente: Paciente) => {
        this.paciente = paciente;
      });
      this.apiService.getConsultasByPacienteId(id).subscribe((consultas: Consulta[]) => {
        this.consultas = consultas.sort((a: Consulta, b: Consulta) => new Date(a.dataConsulta).getTime() - new Date(b.dataConsulta).getTime());
      });
      this.apiService.getExamesByPacienteId(id).subscribe((exames: Exame[]) => {
        this.exames = exames.sort((a: Exame, b: Exame) => new Date(a.dataExame).getTime() - new Date(b.dataExame).getTime());
      });
    }
    
  }

  editAppoiment(id: string) {
    this.router.navigate(['/appointments', id]);
  }

  editExam(id: string) {
    this.router.navigate(['/exam', id]);
  }
  
 

 
}