import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomTextField from '../common/CustomTextField'; 
import FormSnackbar from '../common/FormSnackbar'; 
import ErrorAlert from '../common/ErrorAlert'; 

const defaultTheme = createTheme();

const ResetPassword = () => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Validation schema for Formik
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setError('');
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        setSuccessMessage('Password reset email sent. Please check your inbox.');
        resetForm();
        setTimeout(() => navigate('/login'), 3000);
      })
      .catch((error) => {
        setError(getErrorMessage(error.code));
        setSubmitting(false);
      });
  };

  // Map Firebase error codes to user-friendly messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email. Please check the email or sign up.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" sx={{minHeight:'60vh'}}>
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
            Reset Password
          </Typography>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form noValidate autoComplete="off">
                <CustomTextField
                  name="email"
                  label="Email Address"
                  touched={touched}
                  errors={errors}
                />

                {error && <ErrorAlert message={error} />}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Send Reset Link
                </Button>
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

export default ResetPassword;
