import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { addPassenger } from "../../api/addPassenger";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Passenger = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [passengerData, setPassengerData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
  });
  const fieldOnChangeHandler = (event) => {
    setPassengerData({
      ...passengerData,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const flightId = searchParams.get("flightId");
      if (flightId == null) {
        toast.error("Cannot get the flight details");
        return;
      }
      await addPassenger({ ...passengerData, flightId: parseInt(flightId) });
      toast.success("Passenger added successfully");
      navigate("/list-flight");
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
        Passenger Registration
      </Typography>
      <Stack
        width={400}
        mx={"auto"}
        spacing={2}
        component={"form"}
        onSubmit={onSubmitHandler}
      >
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          size="medium"
          name="name"
          value={passengerData.name}
          onChange={fieldOnChangeHandler}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          size="medium"
          type="email"
          name="email"
          value={passengerData.email}
          onChange={fieldOnChangeHandler}
          required
        />
        <TextField
          label="Country Code"
          variant="outlined"
          fullWidth
          size="medium"
          name="countryCode"
          value={passengerData.countryCode}
          disabled
          onChange={fieldOnChangeHandler}
          required
        />
        <TextField
          label="Phone number"
          variant="outlined"
          fullWidth
          size="medium"
          name="phoneNumber"
          value={passengerData.phoneNumber}
          onChange={fieldOnChangeHandler}
          required
        />
        <Button variant="contained" size="large" type="submit">
          Add Passenger
        </Button>
      </Stack>
    </>
  );
};

export default Passenger;
