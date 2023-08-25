import * as yup from 'yup';

export const insurancePlanValidationSchema = yup.object().shape({
  plan_name: yup.string().required(),
  coverage: yup.number().integer().required(),
  premium: yup.number().integer().required(),
  deductible: yup.number().integer().required(),
  out_of_pocket_maximum: yup.number().integer().required(),
  insurance_provider_id: yup.string().nullable().required(),
});
