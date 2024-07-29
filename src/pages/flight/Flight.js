import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { addFlight } from "../../api/addFlight";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { dayJSFormat } from "../../lib/helper";
import { updateFlight } from "../../api/updateFlight";

const Flight = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isUpdate = !!state?.isUpdate;
  const updateData = state?.data;
  const [flightData, setFlightData] = useState({
    id: isUpdate ? updateData?.id : undefined,
    airline: "Indigo",
    departureGate: isUpdate ? updateData?.departureGate : "",
    arrivalGate: isUpdate ? updateData?.arrivalGate : "",
    scheduledDeparture: isUpdate
      ? dayJSFormat(updateData?.scheduledArrival)
      : null,
    scheduledArrival: isUpdate
      ? dayJSFormat(updateData?.scheduledArrival)
      : null,
    actualDeparture: isUpdate
      ? dayJSFormat(updateData?.actualDeparture)
      : undefined,
    actualArrival: isUpdate
      ? dayJSFormat(updateData?.actualArrival)
      : undefined,
  });
  const fieldOnChangeHandler = (event) => {
    setFlightData({
      ...flightData,
      [event.target.name]: event.target.value,
    });
  };
  const handleScheduledDepartureChange = (date) => {
    setFlightData({
      ...flightData,
      scheduledDeparture: date,
    });
  };
  const handleScheduledArrivalChange = (date) => {
    setFlightData({
      ...flightData,
      scheduledArrival: date,
    });
  };
  const handleActualDepartureChange = (date) => {
    setFlightData({
      ...flightData,
      actualDeparture: date,
    });
  };
  const handleActualArrivalChange = (date) => {
    setFlightData({
      ...flightData,
      actualArrival: date,
    });
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = isUpdate
        ? await updateFlight(flightData)
        : await addFlight(flightData);
      navigate("/list-flight");
      toast.success(response?.data?.message || "Success");
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
        {isUpdate ? "Update Flight" : "Add Flight"}
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
          name="departureGate"
          value={flightData.departureGate}
          onChange={fieldOnChangeHandler}
          required
        />
        <TextField
          label="Arrival Gate"
          variant="outlined"
          fullWidth
          size="medium"
          name="arrivalGate"
          value={flightData.arrivalGate}
          onChange={fieldOnChangeHandler}
          required
        />
        <DateTimePicker
          label="Schedule Departure Time"
          value={flightData.scheduledDeparture}
          format="YYYY/MM/DD hh:mm a"
          name="scheduledDeparture"
          onChange={handleScheduledDepartureChange}
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />
        <DateTimePicker
          label="Schedule Arrival Time"
          value={flightData.scheduledArrival}
          format="YYYY/MM/DD hh:mm a"
          onChange={handleScheduledArrivalChange}
          name="scheduledArrival"
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />
        {isUpdate && (
          <DateTimePicker
            label="Actual Departure Time"
            value={flightData.actualDeparture}
            format="YYYY/MM/DD hh:mm a"
            onChange={handleActualDepartureChange}
            name="actualDeparture"
          />
        )}
        {isUpdate && (
          <DateTimePicker
            label="Actual Arrival Time"
            value={flightData.actualArrival}
            format="YYYY/MM/DD hh:mm a"
            onChange={handleActualArrivalChange}
            name="actualArrival"
          />
        )}
        <Button variant="contained" size="large" type="submit">
          {isUpdate ? "Update Flight" : "Add Flight"}
        </Button>
      </Stack>
    </>
  );
};

export default Flight;
