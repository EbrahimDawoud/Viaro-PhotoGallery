import React from 'react';
import { TextField } from '@mui/material';
import { Field, ErrorMessage } from 'formik';

const CustomTextField = ({ name, label, type = 'text', ...props }) => {
  return (
    <Field
      as={TextField}
      name={name}
      variant="outlined"
      fullWidth
      id={name}
      label={label}
      type={type}
      error={props.touched[name] && Boolean(props.errors[name])}
      helperText={props.touched[name] && <ErrorMessage name={name} component="span" style={{ color: 'red' }} />}
      {...props}
    />
  );
};

export default CustomTextField;
