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
  ],
})
export class PatientRegistrationComponent {
  formPatient: FormGroup | any;
  isDeleting: boolean = false;
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cepService: CepService,
    private ApiService: ApiService,
    private formatService: FormatService,
    private router: Router,
    private stateManagementService: StateManagementService,
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
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ApiService.get('pacientes', id).subscribe(
        (data) => {
          this.formPatient.patchValue(data);
          this.isEditing = true;
        },
        (error) => {
          alert('Erro ao carregar detalhes do paciente: ' + error);
        },
      );
    }
    this.formPatient.get('cep').valueChanges.subscribe((cep: string) => {
      if (cep && cep.length === 8) {
        this.cepService.getCepData(cep).subscribe((data) => {
          this.formPatient.patchValue({
            logradouro: data.logradouro,
            complemento: data.complemento,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          });
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

  onSubmit() {
    if (this.formPatient.valid) {
      const dadosParaEnviar = { ...this.formPatient.value };
      this.removeFormats(dadosParaEnviar);
      if (this.isEditing) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.ApiService.update('pacientes', id, dadosParaEnviar).subscribe(
            (data) => {
              alert('Paciente atualizado com sucesso!');
              this.ApiService.getAll('pacientes').subscribe(
                (data) => {
                  this.stateManagementService.setPacientes(data as Paciente[]);
                },
                (error) => {
                  alert('Erro ao buscar pacientes: ' + error);
                },
              );
            },
            (error) => {
              alert('Erro ao atualizar paciente: ' + error);
            },
          );
        } else {
          alert('ID do paciente não encontrado.');
        }
      } else {
        this.ApiService.create('pacientes', dadosParaEnviar).subscribe(
          (data) => {
            alert('Paciente criado com sucesso!');
            this.isEditing = true;
            this.stateManagementService.setPacientes(data as Paciente[]);
          },
          (error) => {
            alert('Erro ao criar paciente: ' + error);
          },
        );
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  
  deletePatient() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isDeleting = true;
      this.ApiService.delete('pacientes', id).subscribe(
        () => {
          alert('Paciente deletado com sucesso!');
          this.isDeleting = false;
          this.router.navigate(['/home']);
        },
        (error) => {
          alert('Erro ao deletar paciente: ' + JSON.stringify(error));
          this.isDeleting = false;
        },
      );
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
