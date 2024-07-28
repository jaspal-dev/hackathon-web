import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { OTPRequest } from "../../api/OTPRequest";
import { OTPVerify } from "../../api/OTPVerify";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const user = useRef(JSON.parse(localStorage.getItem("user"))).current;
  const navigate = useNavigate();
  const isOtpSent = useRef({
    email: false,
    sms: false,
  });
  const [otp, setOtp] = useState({
    email: "",
    sms: "",
  });
  const [otpSubmitted, setOtpSubmitted] = useState({
    email: user.isEmailVerified,
    sms: user.isPhoneNumberVerified,
  });
  useEffect(() => {
    if (otpSubmitted.email && otpSubmitted.sms) {
      navigate("/logout");
    }
  }, [otpSubmitted, navigate]);
  const handleFormChange = (event) => {
    setOtp({
      ...otp,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmitOTP = async (event) => {
    event.preventDefault();
    try {
      await OTPVerify({
        otpChannel: event.target.id.toUpperCase(),
        otp: otp[event.target.id],
      });
      toast.success("OTP verified successfully");
      setOtpSubmitted({
        ...otpSubmitted,
        [event.target.id]: true,
      });
    } catch (err) {
      const errorMessage = Array.isArray(err?.response?.data?.message)
        ? err?.response?.data?.message?.[0]
        : err?.response?.data?.message;
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    async function sendOTP() {
      try {
        if (!isOtpSent.current.sms) {
          isOtpSent.current.sms = true;
          await OTPRequest({ otpChannel: "SMS" });
          toast.success("OTP Sent");
        }
      } catch (err) {
        const errorMessage = Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message?.[0]
          : err?.response?.data?.message;
        if (errorMessage === "Phone number already verified") {
          setOtpSubmitted((otpSubmitted) => ({
            ...otpSubmitted,
            sms: true,
          }));
        } else {
          toast.error(errorMessage);
        }
      }
      try {
        if (!isOtpSent.current.email) {
          isOtpSent.current.email = true;
          await OTPRequest({ otpChannel: "EMAIL" });
          toast.success("OTP Sent");
        }
      } catch (err) {
        const errorMessage = Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message?.[0]
          : err?.response?.data?.message;
        if (errorMessage === "Email already verified") {
          setOtpSubmitted((otpSubmitted) => ({
            ...otpSubmitted,
            email: true,
          }));
        } else {
          toast.error(errorMessage);
        }
      }
    }
    sendOTP();
  }, []);
  return (
    <Box>
      <Typography variant="h3" textAlign={"center"} mt={5}>
        OTP Verification
      </Typography>
      <Stack>
        <Stack
          width={450}
          mx={"auto"}
          mt={4}
          direction={"row"}
          columnGap={2}
          component={"form"}
          id="sms"
          onSubmit={handleSubmitOTP}
        >
          <TextField
            label="Mobile OTP"
            variant="outlined"
            value={otp.sms}
            id="sms"
            fullWidth
            disabled={otpSubmitted.sms}
            onChange={handleFormChange}
          />
          <Button
            variant="contained"
            type="submit"
            id="mobile-otp-submit-button"
            disabled={otpSubmitted.sms}
          >
            Verify
          </Button>
        </Stack>
        <Stack
          width={450}
          mx={"auto"}
          mt={4}
          id="email"
          direction={"row"}
          columnGap={2}
          component={"form"}
          onSubmit={handleSubmitOTP}
        >
          <TextField
            label="Email OTP"
            variant="outlined"
            value={otp.email}
            id="email"
            fullWidth
            onChange={handleFormChange}
            disabled={otpSubmitted.email}
          />
          <Button
            variant="contained"
            type="submit"
            id="email-otp-submit-button"
            disabled={otpSubmitted.email}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OTPVerification;
