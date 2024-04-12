import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shareds_components/toolbar/toolbar.component';
import { SidebarComponent } from '../shareds_components/sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ToolbarComponent, SidebarComponent, CommonModule],
})
export class HomeComponent {
  pacientes: any[] = [];
  consultas: any[] = [];
  exames: any[] = [];

  totalPacientes: number = 0;
  totalConsultas: number = 0;
  totalExames: number = 0;

  httpClient = inject(HttpClient);
  ngOnInit(){
    this.httpClient.get<any>('http://localhost:3000/pacientes').subscribe((pacientes) => {
      this.pacientes = pacientes;
    });
    this.httpClient.get<any>('http://localhost:3000/pacientes').subscribe((pacientes) => {
      this.pacientes = pacientes;
      this.totalPacientes = pacientes.length;
    });

    this.httpClient.get<any>('http://localhost:3000/consultas').subscribe((consultas) => {
      this.consultas = consultas;
      this.totalConsultas = consultas.length;
    });

    this.httpClient.get<any>('http://localhost:3000/exames').subscribe((exames) => {
      this.exames = exames;
      this.totalExames = exames.length;
    });
  }

}
