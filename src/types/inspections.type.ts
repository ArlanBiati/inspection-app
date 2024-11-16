export type Anomalies = {
  id: number
  nome: string
}

export type AnomaliesTypes = {
  descricao: string
  enum: string
}

export type Categories = {
  descricao: string
  enum: string
  prioridade: number
}

export type TypeInspections = {
  descricao: string
  enum: string
}

export type Environments = {
  id: number
  nome: string
}

export type InspectionsProps = {
  id: number
  areaVistoriaInterna_id: number
  dataHora: Date
  contemAnomalia: boolean
  tipo: TypeInspections
  categoria: Categories
  observacao: string
  anomalia: Anomalies
  fotos: string[]
}

export type CreateInspection = {
  areaVistoriaInterna_id: number
  dataHora: Date
  contemAnomalia: boolean
  anomalia_id: number
  tipo: string
  categoria: string
  observacao: string
}

export type CreateInspectionPayload = {
  environmentId: number
  anomalyId: number
  hasAnamoly: boolean
  anomalyType: string
  category: string
  observation: string
}
