import { Component, OnInit, inject } from '@angular/core';
import { ToolbarComponent } from '../shareds_components/toolbar/toolbar.component';
import { SidebarComponent } from '../shareds_components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgeService } from '../../services/age/age.service';
import { Paciente, Consulta, Exame } from './medical.interfaces';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { filter } from 'rxjs';
import { FormatService } from '../../services/format/format.service';
import { ModalComponent } from '../shareds_components/modal/modal.component';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    ToolbarComponent,
    SidebarComponent,
    CommonModule,
    FormsModule,
    ModalComponent,
  ],
})
export class HomeComponent implements OnInit {
  message: string | undefined;
  pageSize: number = 4;
  pageIndex: number = 0;
  totalPacientes: number = 0;
  pacientes: Paciente[] = [];
  consultas: Consulta[] = [];
  exames: Exame[] = [];

  searchTerm: string = '';
  searchField: string = 'nome';
  filteredPacientes = Array(1).fill({
    nome: 'Não há pacientes cadastrados',
    idade: 'Não há pacientes cadastrados',
    telefone: 'Não há pacientes cadastrados',
    email: 'Não há pacientes cadastrados',
    convenio: 'Não há pacientes cadastrados',
  });

  constructor(
    private ageService: AgeService,
    private router: Router,
    private apiService: ApiService,
    private formatService: FormatService,
    private modalService: ModalService,
  ) {
    window.addEventListener('resize', this.updatePageSize);
  }

  async ngOnInit() {
    this.updatePageSize();
    await this.fetchData();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async () => {
        await this.fetchData();
      });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updatePageSize);
  }

  async fetchData() {
    try {
      const pacientes: Paciente[] = await this.apiService.getAll('pacientes');
      this.pacientes = pacientes.map((paciente) => ({
        ...paciente,
        idade: this.ageService.calculateAge(paciente.dataNascimento),
        telefone: this.formatService.formatPhone(paciente.telefone),
      }));
      this.filteredPacientes = [...this.pacientes];
      this.totalPacientes = this.pacientes.length;

      this.consultas = await this.apiService.getAll('consultas');
      this.exames = await this.apiService.getAll('exames');
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    }
  }

  updatePageSize = () => {
    this.pageSize = window.matchMedia('(max-width: 600px)').matches ? 1 : 4;
  };

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
    this.pageIndex = 0;
  }
  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.filteredPacientes.length) {
      this.pageIndex++;
    }
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
  }

  More(id: string): void {
    this.router.navigate(['/patientRegistration', id]);
  }
}
