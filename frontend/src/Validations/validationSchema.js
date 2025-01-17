import * as Yup from 'yup';

// Yup validation schema
export const ValidationSchema = Yup.object({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters long')
    .max(20, 'Username cannot be more than 20 characters')
    .required('Username is required'),
    
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      'Password must include one uppercase, one lowercase, one number, and one special character')
    .required('Password is required'),
});


