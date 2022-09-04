import * as Yup from 'yup'

const addCategorySchema = Yup.object().shape({
    name: Yup.string()
        .required('Boş qoyula bilməz')
        .min(3, 'Ən az 3 hərf olmalıdır')
        .max(50, 'Ən çox 50 hərf olmalıdır'),
})
export {
    addCategorySchema
}
