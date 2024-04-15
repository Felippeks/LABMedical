export interface Paciente {
  id: string;
  nome: string;
  idade?: number;
  genero: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  OrgaoExpedidor: string;
  estadoCivil: string;
  telefone: string;
  email: string;
  naturalidade: string;
  contatoEmergencia: string;
  listaAlergias: string[];
  listaCuidadosEspecificos: string[];
  convenio: string;
  numeroConvenio: string;
  validadeConvenio: string;
  endereco: string;
  cep: string;
  cidade: string;
  estado: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  referencia: string;
  [key: string]: any;
}

export interface Consulta {
  id: string;
  motivoConsulta: string;
  dataConsulta: string;
  horarioConsulta: string;
  descricaoProblema: string;
  medicacaoReceitada: string;
  dosagemPrecaucoes: string;
  [key: string]: any;
}

export interface Exame {
  id: string;
  nomeExame: string;
  dataExame: string;
  horarioExame: string;
  tipoExame: string;
  laboratorio: string;
  urlDocumento: string;
  [key: string]: any;
}
