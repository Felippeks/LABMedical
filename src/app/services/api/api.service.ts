import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrls: { [key: string]: string } = {
    pacientes: 'https://661f7c6516358961cd94743c.mockapi.io/Pacientes',
    consultas: 'https://661f7c6516358961cd94743c.mockapi.io/Consultas',
    exames: 'https://661fcecd16358961cd958ce7.mockapi.io/exames',
  };

  constructor(private http: HttpClient) {}

  getAll(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrls[endpoint]}`);
  }

  get(endpoint: string, id: string): Observable<any> {
    return this.http.get(`${this.baseUrls[endpoint]}/${id}`);
  }

  getConsultasByPacienteId(pacienteId: string): Observable<any> {
    return this.http.get(
      `${this.baseUrls['consultas']}?pacienteId=${pacienteId}`,
    );
  }
  getExamesByPacienteId(pacienteId: string): Observable<any> {
    return this.http.get(
      `${this.baseUrls['exames']}?pacienteId=${pacienteId}`,
    );
  }
  create(endpoint: string, data: Object): Observable<Object> {
    return this.http.post(`${this.baseUrls[endpoint]}`, data);
  }

  update(endpoint: string, id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrls[endpoint]}/${id}`, value);
  }

  delete(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrls[endpoint]}/${id}`, {
      responseType: 'text',
    });
  }
}
