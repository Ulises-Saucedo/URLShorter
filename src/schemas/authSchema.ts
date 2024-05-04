import * as Yup from 'yup'

export const authSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email no válido')
    .required('Campo requerido')
    .typeError('Formato no esperado'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .max(25, 'Máximo 25 caracteres')
    .required('Campo requerido')
    .typeError('Formato no esperado')
})
