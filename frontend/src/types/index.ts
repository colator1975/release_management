export interface DeliveryLaneConfig {
  id?: string;
  entity: string;
  laneName: string;
  subLaneId?: string;
  devBouchonne?: string;
  devIntegre?: string;
  accostage?: string;
  qualFonct?: string;
  homolEntite?: string;
  homolDistrib?: string;
  preProd?: string;
  prod?: string;
}

export interface EligibilityForm {
  id?: string;
  cprCode: string;
  entity: string;
  formData: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectMapping {
  id?: string;
  cprCode: string;
  bloc: string;
  application: string;
  status: string;
  state?: string;
}

export interface Release {
  id?: string;
  name: string;
  version: string;
  status: string;
  description?: string;
  entity: string;
  canal: string;
  projects: string[];
  dates: Record<string, string>;
}
