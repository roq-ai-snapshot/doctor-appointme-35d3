import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InsurancePlanInterface {
  id?: string;
  plan_name: string;
  coverage: number;
  premium: number;
  deductible: number;
  out_of_pocket_maximum: number;
  insurance_provider_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface InsurancePlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  plan_name?: string;
  insurance_provider_id?: string;
}
