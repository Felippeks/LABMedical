import { Component } from '@angular/core';
import { SidebarComponent } from '../shareds_components/sidebar/sidebar.component';
import { ToolbarComponent } from '../shareds_components/toolbar/toolbar.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { CepService } from '../../services/cep/cep.service';
import { ApiService } from '../../services/api/api.service';
import { FormatService } from '../../services/format/format.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StateManagementService } from '../../services/StateManagementService/state-management.service';
import { Paciente } from '../home/medical.interfaces';
import { forkJoin } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import { ModalComponent } from '../shareds_components/modal/modal.component';

function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const date = new Date(control.value);
    const isValid = !isNaN(date.getTime());
    return isValid ? null : { invalidDate: { value: control.value } };
  };
}
@Component({
  selector: 'app-patient-registration',
  standalone: true,
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.scss',
  imports: [
    SidebarComponent,
    ToolbarComponent,
    ReactiveFormsModule,
    CommonModule,
    ModalComponent
  ],
})
export class PatientRegistrationComponent {
  formPatient: FormGroup | any;
  isDeleting: boolean = false;
  isEditing: boolean = false;
  message: string | undefined;


  constructor(
    private route: ActivatedRoute,
    private cepService: CepService,
    private ApiService: ApiService,
    private formatService: FormatService,
    private router: Router,
    private stateManagementService: StateManagementService,
    private modalService: ModalService,
  ) {
    this.formPatient = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      genero: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', [
        Validators.required,
        dateValidator(),
      ]),
      cpf: new FormControl('', Validators.required),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      orgaoExpedidor: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      estadoCivil: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email]),
      naturalidade: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      contatoEmergencia: new FormControl('', Validators.required),
      listaAlergias: new FormControl(''),
      listaCuidadosEspecificos: new FormControl(''),
      convenio: new FormControl(''),
      numeroConvenio: new FormControl('', [Validators.maxLength(20)]),
      validadeConvenio: new FormControl(''),
      cep: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      bairro: new FormControl('', Validators.required),
      referencia: new FormControl(''),
    });

    if (this.formPatient) {
      this.setupValueChanges();
    }
  }
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        const data = await this.ApiService.get('pacientes', id);
        this.formPatient.patchValue(data);
        this.isEditing = true;
      } catch (error) {
        this.modalService.setMessage('Erro ao carregar detalhes do paciente: ' + error);
        this.message = 'Erro ao carregar detalhes do paciente: ' + error;
      }
    }

    this.formPatient.get('cep').valueChanges.subscribe((cep: string) => {
      if (cep && cep.length === 8) {
        this.cepService.getCepData(cep).subscribe(data => {
          if (data.erro) {
            this.modalService.setMessage('CEP inválido!');
            this.message = 'CEP inválido!';
          } else {
            this.formPatient.patchValue({
              logradouro: data.logradouro,
              complemento: data.complemento,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf,
            });
          }
        }, error => {
          this.modalService.setMessage('Erro ao buscar dados do CEP: ' + error);
          this.message = 'Erro ao buscar dados do CEP: ' + error;
        });
      }
    });
  }

  setupValueChanges() {
    this.setupFormatOnValueChange('cpf', this.formatService.formatCPF);
    this.setupFormatOnValueChange('telefone', this.formatService.formatPhone);
    this.setupFormatOnValueChange(
      'contatoEmergencia',
      this.formatService.formatPhone,
    );
    this.setupFormatOnValueChange('cep', this.formatService.formatCEP);
  }

  setupFormatOnValueChange(field: string, formatFunction: (value: any) => any) {
    this.formPatient.get(field)!.valueChanges.subscribe((valor: any) => {
      this.formPatient!.get(field)!.setValue(formatFunction(valor), {
        emitEvent: false,
      });
    });
  }

   async onSubmit() {
    if (this.formPatient.valid) {
      const dadosParaEnviar = { ...this.formPatient.value };
      this.removeFormats(dadosParaEnviar);
      if (this.isEditing) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          try {
            await this.ApiService.update('pacientes', id, dadosParaEnviar);
            this.modalService.setMessage('Paciente atualizado com sucesso!');
            this.message = 'Paciente atualizado com sucesso!';
            const data = await this.ApiService.getAll('pacientes');
            this.stateManagementService.setPacientes(data as Paciente[]);
          } catch (error) {
            this.modalService.setMessage('Erro ao atualizar paciente: ' + error);
            this.message = 'Erro ao atualizar paciente: ' + error;
          }
        } else {
          this.modalService.setMessage('ID do paciente não encontrado.');
          this.message = 'ID do paciente não encontrado.';
        }
      } else {
        try {
          const data = await this.ApiService.create('pacientes', dadosParaEnviar);
          this.modalService.setMessage('Paciente criado com sucesso!');
          this.message = 'Paciente criado com sucesso!';
          this.isEditing = true;
          this.stateManagementService.setPacientes(data as Paciente[]);
        } catch (error) {
          this.modalService.setMessage('Erro ao criar paciente: ' + error);
          this.message = 'Erro ao criar paciente: ' + error;
        }
      }
    } else {
      this.modalService.setMessage('Por favor, preencha todos os campos obrigatórios.');
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }

  async deletePatient() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isDeleting = true;
      try {
        const [consultas, exames] = await Promise.all([
          this.ApiService.getConsultasByPacienteId(id),
          this.ApiService.getExamesByPacienteId(id),
        ]);
        if (consultas.length > 0 || exames.length > 0) {
          this.modalService.setMessage(
            'O paciente tem consultas e/ou exames cadastrados. Não é possível excluir.',
          );
          this.message = 'O paciente tem consultas e/ou exames cadastrados. Não é possível excluir.'
          this.isDeleting = false;
        } else {
          await this.ApiService.delete('pacientes', id);
          this.modalService.setMessage('Paciente deletado com sucesso!');
          this.message = 'Paciente deletado com sucesso!';
          this.isDeleting = false;
          this.router.navigate(['/home']);
        }
      } catch (error) {
        this.modalService.setMessage('Erro ao deletar paciente: ' + JSON.stringify(error));
        this.message = 'Erro ao deletar paciente: ' + JSON.stringify(error);
        this.isDeleting = false;
      }
    }
  }

  removeFormats(data: any) {
    const fieldsToFormat = [
      'cpf',
      'telefone',
      'contatoEmergencia',
      'cep',
      'numeroConvenio',
      'rg',
    ];
    fieldsToFormat.forEach((field) => {
      data[field] = this.formatService.removeFormat(data[field]);
    });
  }
}
