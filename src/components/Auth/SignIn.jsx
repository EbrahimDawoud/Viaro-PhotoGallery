import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Formik, Form} from 'formik';
import { Grid, Link } from '@mui/material';
import * as Yup from 'yup';
import CustomTextField from '../common/CustomTextField';
import FormSnackbar from '../common/FormSnackbar';
import ErrorAlert from '../common/ErrorAlert';

const defaultTheme = createTheme();

const SignIn = () => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setError('');
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        setSuccessMessage('Sign in successful! Redirecting to homepage...');
        resetForm();
        setTimeout(() => navigate('/home'), 3000);
      })
      .catch((error) => {
        setError(getErrorMessage(error.code));
        setSubmitting(false);
      });
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/wrong-password':
        return 'The password is invalid. Please try again.';
      case 'auth/user-not-found':
        return 'No user found with this email. Please check the email or sign up.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{minHeight:'60vh'}}>
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form noValidate autoComplete='off'>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomTextField name="email" label="Email Address" touched={touched} errors={errors} />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField name="password" label="Password" type="password" touched={touched} errors={errors} />
                  </Grid>
                </Grid>

                {error && <ErrorAlert message={error} />}

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
                  Sign In
                </Button>

                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Link href="/SignUp" variant="body2">
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link  variant="body2" href="/ResetPassword">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <FormSnackbar message={successMessage} severity="success" open={!!successMessage} onClose={() => setSuccessMessage('')} />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
