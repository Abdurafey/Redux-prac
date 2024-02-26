import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/Header";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const Form = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.countrystatecity.in/v1/countries", {
          method: 'GET',
          headers: {
            'X-CSCAPI-KEY': 'eldpalJ5ZXJpY3VZNmZ0TmRhREIxbXA1bDhhSG5nVUM3SDFMU3FzbA==', // Replace 'API_KEY' with your actual API key
          },
          redirect: 'follow',
        });

        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        } else {
          console.error('Failed to fetch countries');
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  const validateForm = (values) => {
    let isValid = true;

    // Email validation
    if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
      isValid = false;
    }

    // Password validation
    if (!values.password || values.password.length < 6) {
      isValid = false;
    }

    return isValid;
  };

  const handleFormSubmit = (values) => {
    if (validateForm(values)) {
      // Perform form submission logic here
      console.log('Form Data:', values);
      navigate("/supportPages");
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* ... existing form fields ... */}
              
              {/* Additional form fields for email and password */}
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// ... rest of the code remains the same ...

const checkoutSchema = yup.object().shape({
  // ... existing validation rules ...
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const initialValues = {
  // ... existing initial values ...
  email: "",
  password: "",
};

export default Form;
