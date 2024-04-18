import { FormatService } from '../services/format/format.service';
import { CpfPipe } from './cpf.pipe';

describe('CpfPipe', () => {
  it('create an instance', () => {
    const formatService = new FormatService();
    const pipe = new CpfPipe(formatService); 
    expect(pipe).toBeTruthy();
  });
});
