import * as Yup from 'yup';

export const childFormValidationSchema = Yup.object().shape({
    babyName: Yup.string().required('Baby name is required'),
    middleName: Yup.string(),
    babyLastName: Yup.string().required('Last name is required'),
    dob: Yup.date()
        .required('Date of birth is required')
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), 'Child must be at least 1 year old')
        .min(new Date(new Date().setFullYear(new Date().getFullYear() - 5)), 'Child must be at most 5 years old'),
    gender: Yup.string().required('Gender is required'),
    parentName: Yup.string().required('Parent name is required'),
    relationship: Yup.string().required('Relationship is required'),
    otherRelationship: Yup.string().when('relationship', {
        is: 'Other',
        then: Yup.string().required('Please specify the relationship')
    }),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string()
        .required('ZIP is required')
        .matches(/^[0-9]{5}$/, 'ZIP must be 5 digits'),
    country: Yup.string().required('Country is required'),
    homeTelephone: Yup.string().required('Home telephone is required'),
    otherTelephone: Yup.string(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    assistingPeople: Yup.string()
});
