import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../shareds_components/sidebar/sidebar.component';
import { ToolbarComponent } from '../shareds_components/toolbar/toolbar.component';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { Consulta, Exame, Paciente } from '../home/medical.interfaces';
import { AgeService } from '../../services/age/age.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medical-record-listing',
  standalone: true,
  templateUrl: './medical-listing.component.html',
  styleUrl: './medical-listing.component.scss',
  imports: [SidebarComponent, ToolbarComponent, CommonModule, FormsModule],
})
export class MedicalRecordListingComponent implements OnInit {
  totalPacientes: number = 0
  pacientes: Paciente[] = [];
  consultas: Consulta[] = [];
  exames: Exame[] = [];

  searchTerm: string = '';
  searchField: string = 'nome';
  filteredPacientes: Paciente[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private ageService: AgeService,
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getAll('pacientes').subscribe((pacientes: Paciente[]) => {
      this.pacientes = pacientes.map((paciente) => ({
        ...paciente,
        idade: this.ageService.calculateAge(paciente.dataNascimento),
      }));
      this.filteredPacientes = [...this.pacientes];
      this.totalPacientes = this.pacientes.length;
    });
  }

  onSearchTermChange() {
    if (this.searchTerm) {
      this.filteredPacientes = this.pacientes.filter((paciente) =>
        paciente[this.searchField]
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()),
      );
    } else {
      this.filteredPacientes = this.pacientes;
    }
  }

  More(id: string): void {
    this.router.navigate(['/patientRegistration', id]);
  }

  
}

