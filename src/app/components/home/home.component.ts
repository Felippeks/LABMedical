import { Component, OnInit, inject } from '@angular/core';
import { ToolbarComponent } from '../shareds_components/toolbar/toolbar.component';
import { SidebarComponent } from '../shareds_components/sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgeService } from '../../services/ageservice.service';
import { Paciente, Consulta, Exame } from './medical.interfaces';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ToolbarComponent, SidebarComponent, CommonModule, FormsModule],
})
export class HomeComponent implements OnInit {
  pacientes: Paciente[] = [];
  consultas: Consulta[] = [];
  exames: Exame[] = [];

  searchTerm: string = '';
  searchField: string = 'nome';
  filteredPacientes: Paciente[] = [];

  constructor(private httpClient: HttpClient, private ageService: AgeService) {}

  ngOnInit(){
    this.httpClient.get<Paciente[]>('http://localhost:3000/pacientes').subscribe((pacientes) => {
      this.pacientes = pacientes.map((paciente) => ({
        ...paciente,
        idade: this.ageService.calculateAge(paciente.dataNascimento)
      }));
      this.filteredPacientes = [...this.pacientes];
    });

    this.httpClient.get<Consulta[]>('http://localhost:3000/consultas').subscribe((consultas) => {
      this.consultas = consultas;
    });

    this.httpClient.get<Exame[]>('http://localhost:3000/exames').subscribe((exames) => {
      this.exames = exames;
    });
  }

  onSearchTermChange() {
    if (this.searchTerm) {
      this.filteredPacientes = this.pacientes.filter(paciente =>
        paciente[this.searchField].toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPacientes = this.pacientes;
    }
  }
}