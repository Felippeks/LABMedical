import { Pipe, PipeTransform } from '@angular/core';
import { FormatService } from '../services/format/format.service';

@Pipe({
  name: 'cpf',
  standalone: true
})
export class CpfPipe implements PipeTransform {

  constructor(private formatService: FormatService) {}

  transform(value: string | null): string {
    if (value === null) {
      return '';
    }
    return this.formatService.formatCPF(value);
  }

}
