import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Paciente } from '../../components/home/medical.interfaces';

@Injectable({
  providedIn: 'root',
})
export class StateManagementService {
  private _pacientes = new BehaviorSubject<Paciente[]>([]);
  pacientes$ = this._pacientes.asObservable();

  setPacientes(pacientes: Paciente[]) {
    this._pacientes.next(pacientes);
  }
}
