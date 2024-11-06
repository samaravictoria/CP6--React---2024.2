export type TipoAluno = {
  $id: number;
  nome: string;
  sala: string;
  rm: string;   
}

export type TipoMedia = {
  $id: number;
  idAluno: TipoAluno;
  materia: string;
  semestre: string;
  nota: number;
}

export type TipoGs =  {
  $id: number;
  materia: string;
  semestre: string;
  descricao: string;
  nota: number;
  idAluno: TipoAluno;
}

export type TipoCp = {
  $id: number;
  materia: string;
  semestre: string;
  data: string;
  nota: number;    
  idAluno: TipoAluno;
}

export type TipoSprint = {
  $id: number;
  materia: string;
  semestre: string;
  nota: number;
  alunos: TipoAluno;
}
