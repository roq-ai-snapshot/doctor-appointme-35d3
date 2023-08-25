import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  date: yup.date().required(),
  time: yup.date().required(),
  status: yup.string().required(),
  guest_id: yup.string().nullable().required(),
  healthcare_provider_id: yup.string().nullable().required(),
});
