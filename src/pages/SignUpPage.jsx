import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomTextField from '../components/common/CustomTextField'; 
import FormSnackbar from '../components/common/FormSnackbar'; 
import ErrorAlert from '../components/common/ErrorAlert'; 
import { Grid, Link } from '@mui/material';

const defaultTheme = createTheme();

const SignUp = () => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Validation schema for Formik
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required')
      .min(2, 'First Name should be at least 2 characters')
      .max(50, 'First Name should be less than 50 characters'),
    lastName: Yup.string()
      .required('Last Name is required')
      .min(2, 'Last Name should be at least 2 characters')
      .max(50, 'Last Name should be less than 50 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be at least 6 characters'),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setError('');
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: `${values.firstName} ${values.lastName}`
        });
      })
      .then(() => {
        setSuccessMessage('Sign up successful! Redirecting to homepage...');
        resetForm();
        navigate('/login')
      })
      .catch((error) => {
        setError(getErrorMessage(error.code));
        setSubmitting(false);
      });
  };

  // Map Firebase error codes to user-friendly messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already in use. Please use a different email.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{minHeight:'60vh'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign up
          </Typography>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form noValidate autoComplete='off'>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="firstName"
                      label="First Name"
                      touched={touched}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="lastName"
                      label="Last Name"
                      touched={touched}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="email"
                      label="Email Address"
                      touched={touched}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="password"
                      label="Password"
                      type="password"
                      touched={touched}
                      errors={errors}
                    />
                  </Grid>
                </Grid>

                {error && <ErrorAlert message={error} />}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/Login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <FormSnackbar
          message={successMessage}
          severity="success"
          open={!!successMessage}
          onClose={() => setSuccessMessage('')}
        />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
