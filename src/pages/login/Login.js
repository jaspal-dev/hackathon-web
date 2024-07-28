import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../../api/login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const fieldOnChangeHandler = (event) => {
    setloginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await login(loginData);
      const responseData = response?.data ?? {};
      const authorization = response?.headers?.authorization;
      localStorage.setItem("user", JSON.stringify(responseData));
      localStorage.setItem("authorization", authorization);
      if (
        !responseData?.isEmailVerified ||
        !responseData?.isPhoneNumberVerified
      ) {
        toast.success("Login Successfully, please verify the otp");
        navigate("/otp-verification");
      } else {
        toast.success("Login Successfully");
        navigate("/");
      }
    } catch (err) {
      const errorMessage = Array.isArray(err?.response?.data?.message)
        ? err?.response?.data?.message?.[0]
        : err?.response?.data?.message;
      toast.error(
        errorMessage === "Unauthorized"
          ? "Invalid credentials"
          : "Some Error Occoured"
      );
    }
  };
  return (
    <>
      <Typography variant="h3" textAlign={"center"} m={5}>
        Login
      </Typography>
      <Stack
        width={400}
        mx={"auto"}
        spacing={2}
        component={"form"}
        onSubmit={onSubmitHandler}
      >
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          size="medium"
          name="email"
          value={setloginData.email}
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
          value={setloginData.password}
          onChange={fieldOnChangeHandler}
          required
        />
        <Button variant="contained" size="large" type="submit">
          Login
        </Button>
      </Stack>
    </>
  );
};

export default Login;
