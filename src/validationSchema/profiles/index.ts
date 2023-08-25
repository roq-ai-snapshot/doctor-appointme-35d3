import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  bio: yup.string().nullable(),
  specialization: yup.string().nullable(),
  experience: yup.number().integer().nullable(),
  education: yup.string().nullable(),
  certifications: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
