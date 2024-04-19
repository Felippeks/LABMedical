import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrls: { [key: string]: string } = {
    pacientes: 'http://localhost:3000/pacientes',
    consultas: 'http://localhost:3000/consultas',
    exames: 'http://localhost:3000/exames',
    userData: 'http://localhost:3000/userData',
  };

  constructor(private http: HttpClient) {}

  async getAll(endpoint: string): Promise<any> {
    return this.http.get(`${this.baseUrls[endpoint]}`).toPromise();
  }

  async get(endpoint: string, id: string): Promise<any> {
    return this.http.get(`${this.baseUrls[endpoint]}/${id}`).toPromise();
  }

  async getConsultasByPacienteId(pacienteId: string): Promise<any> {
    return this.http
      .get(`${this.baseUrls['consultas']}?pacienteId=${pacienteId}`)
      .toPromise();
  }

  async getExamesByPacienteId(pacienteId: string): Promise<any> {
    return this.http
      .get(`${this.baseUrls['exames']}?pacienteId=${pacienteId}`)
      .toPromise();
  }

  async create(endpoint: string, data: Object): Promise<Object | undefined> {
    return this.http.post(`${this.baseUrls[endpoint]}`, data).toPromise();
  }

  async update(
    endpoint: string,
    id: string,
    value: any,
  ): Promise<Object | undefined> {
    return this.http.put(`${this.baseUrls[endpoint]}/${id}`, value).toPromise();
  }

  async delete(endpoint: string, id: string): Promise<any> {
    return this.http
      .delete(`${this.baseUrls[endpoint]}/${id}`, {
        responseType: 'text',
      })
      .toPromise();
  }
}
