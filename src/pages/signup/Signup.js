import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { signUp } from "../../api/signup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    password: "",
    phoneNumber: "",
  });
  const fieldOnChangeHandler = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await signUp(signUpData);
      const responseData = response?.data ?? {};
      const authorization = response?.headers?.authorization;
      localStorage.setItem("user", JSON.stringify(responseData));
      localStorage.setItem("authorization", authorization);
      toast.success("Account created success, please verify your otp");
      navigate("/otp-verification");
    } catch (err) {
      const errorMessage = Array.isArray(err?.response?.data?.message)
        ? err?.response?.data?.message?.[0]
        : err?.response?.data?.message;
      toast.error(errorMessage ?? "Some Error Occoured");
    }
  };
  return (
    <>
      <Typography variant="h3" textAlign={"center"} m={5}>
        Registration
      </Typography>
      <Stack
        width={400}
        mx={"auto"}
        spacing={2}
        component={"form"}
        onSubmit={onSubmitHandler}
      >
        <TextField
          label="First name"
          variant="outlined"
          fullWidth
          size="medium"
          name="firstName"
          value={signUpData.firstName}
          onChange={fieldOnChangeHandler}
          required
        />
        <TextField
          label="Last name"
          variant="outlined"
          fullWidth
          size="medium"
          name="lastName"
          value={signUpData.lastName}
          onChange={fieldOnChangeHandler}
          required
        />
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          size="medium"
          name="email"
          value={signUpData.email}
          onChange={fieldOnChangeHandler}
          required
        />
        <TextField
          disabled
          label="Country code"
          variant="outlined"
          fullWidth
          size="medium"
          name="countryCode"
          value={signUpData.countryCode}
          onChange={fieldOnChangeHandler}
          required
        />
        <TextField
          label="Phone number"
          variant="outlined"
          fullWidth
          size="medium"
          name="phoneNumber"
          value={signUpData.phoneNumber}
          onChange={fieldOnChangeHandler}
          required
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          size="medium"
          name="password"
          value={signUpData.password}
          onChange={fieldOnChangeHandler}
          required
        />
        <Button variant="contained" size="large" type="submit">
          Create Account
        </Button>
      </Stack>
    </>
  );
};

export default Signup;
