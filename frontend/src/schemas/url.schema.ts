import * as yup from 'yup'

export const urlSchema = yup.object().shape({
  url: yup
    .string()
    .url('El formato de url no es correcto')
    .required('La url es un campo requerido')
    .typeError('La url debe ser una cadena de caracteres')
})
