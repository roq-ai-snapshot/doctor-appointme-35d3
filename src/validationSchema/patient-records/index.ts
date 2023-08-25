import * as yup from 'yup';

export const patientRecordValidationSchema = yup.object().shape({
  medical_history: yup.string().required(),
  current_condition: yup.string().required(),
  medications: yup.string().nullable(),
  allergies: yup.string().nullable(),
  immunization_record: yup.string().nullable(),
  medical_staff_id: yup.string().nullable().required(),
  guest_id: yup.string().nullable().required(),
});
