import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { signUp } from "../../api/signup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const AddFlight = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
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
        Add Flight
      </Typography>
      <Stack
        width={400}
        mx={"auto"}
        spacing={2}
        component={"form"}
        onSubmit={onSubmitHandler}
      >
        <TextField
          label="Departure Gate"
          variant="outlined"
          fullWidth
          size="medium"
          name="Departure Date"
          value={signUpData.firstName}
          onChange={fieldOnChangeHandler}
          required
        />
        <TextField
          label="Arrival Gate"
          variant="outlined"
          fullWidth
          size="medium"
          name="Arrival Date"
          value={signUpData.firstName}
          onChange={fieldOnChangeHandler}
          required
        />
        <DateTimePicker label="Departure Time" />
        <DateTimePicker label="Arrival Time" />
        <Button variant="contained" size="large" type="submit">
          Add Flight
        </Button>
      </Stack>
    </>
  );
};

export default AddFlight;
