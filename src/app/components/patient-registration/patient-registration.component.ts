import { Component } from '@angular/core';
import { SidebarComponent } from '../shareds_components/sidebar/sidebar.component';
import { ToolbarComponent } from '../shareds_components/toolbar/toolbar.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CepService } from '../../services/cep.service';


@Component({
  selector: 'app-patient-registration',
  standalone: true,
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.scss',
  imports: [SidebarComponent, ToolbarComponent],
})
export class PatientRegistrationComponent {
  formPatient = new FormGroup({
    nome: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    nascimento: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    rg: new FormControl('', Validators.required),
    estadoCivil: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    naturalidade: new FormControl('', Validators.required),
    contatoEmergencia: new FormControl('', Validators.required),
    alergias: new FormControl(''),
    cuidados: new FormControl(''),
    convenio: new FormControl('', Validators.required),
    numeroConvenio: new FormControl('', Validators.required),
    validadeConvenio: new FormControl('', Validators.required),
    cep: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    logradouro: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    complemento: new FormControl(''),
    bairro: new FormControl('', Validators.required),
    referencia: new FormControl('')
  });

  onSubmit() {
    if (this.formPatient.valid) {
      console.log('Formulário enviado', this.formPatient.value);
      alert('Formulário enviado com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  constructor(private cepService: CepService) { }
  onCepChange() {
    const cepControl = this.formPatient.get('cep');
    if (cepControl && cepControl.value && cepControl.value.length === 8) {
      const cep = cepControl.value;
      this.cepService.getCepData(cep).subscribe(data => {
        this.formPatient.patchValue({
          logradouro: data.logradouro,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        });
      });
    }
  }
}