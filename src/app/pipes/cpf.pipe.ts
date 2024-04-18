import { Pipe, PipeTransform } from '@angular/core';
import { FormatService } from '../services/format/format.service';

@Pipe({
  name: 'cpf',
  standalone: true
})
export class CpfPipe implements PipeTransform {

  constructor(private formatService: FormatService) {}

  transform(value: any): any {
    return this.formatService.formatCPF(value);
  }

}
