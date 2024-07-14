import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Mínimo 4 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .required('Campo requerido')
    .typeError('Formato no esperado'),
  email: Yup.string()
    .email('Formato de email no válido')
    .required('Campo requerido')
    .typeError('Formato no esperado'),
  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .required('Campo requerido')
    .typeError('Formato no esperado')
})

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email no válido')
    .required('Campo requerido')
    .typeError('Formato no esperado'),
  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .required('Campo requerido')
    .typeError('Formato no esperado')
})
