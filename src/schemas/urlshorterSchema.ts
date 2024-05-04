import * as Yup from 'yup'

export const urlSchema = Yup.object().shape({
  longUrl: Yup.string()
    .url('Formato incorrecto')
    .required('Campo requerido')
    .typeError('El campo debe ser de tipo string')
})
