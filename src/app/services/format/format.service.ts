import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  constructor() {}

  formatCPF(cpf: string | null): string {
    if (cpf === null) {
      return '';
    }
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{2})$/, '$1-$2');
  }

  formatPhone(telefone: string): string {
    const numeros = telefone.replace(/\D/g, '');
    return numeros.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  }

  removeFormat(valor: string): string {
    return valor.replace(/\D/g, '');
  }

  formatCEP(cep: string): string {
    const numeros = cep.replace(/\D/g, '');
    return numeros.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}
