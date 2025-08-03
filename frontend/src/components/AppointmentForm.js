import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  Paper,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Fade,
  IconButton,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";

function AppointmentForm({ doctor, onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: null,
    time: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    if (!validatePhoneNumber(formData.phone)) {
      setError("Phone number must be exactly 10 digits");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      // Combine date and time into one ISO string
      const appointmentDateTime = new Date(formData.date);
      appointmentDateTime.setHours(formData.time.getHours());
      appointmentDateTime.setMinutes(formData.time.getMinutes());

      const newAppointment = {
        doctorId: doctor.id.toString(),
        doctorName: doctor.name,
        patientName: formData.name,
        patientEmail: formData.email,
        phone: formData.phone,
        datetime: appointmentDateTime.toISOString(),
        status: "Confirmed",
      };

      // Send to backend
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
      });

      if (!res.ok) throw new Error("Failed to save appointment to server");

      const savedAppointment = await res.json();
      setSuccess(true);

      // Redirect to confirmation after delay
      setTimeout(() => {
        navigate("/appointment-confirmation", {
          state: { appointment: savedAppointment, doctor },
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  // ✅ Success State UI
  if (success) {
    return (
      <Fade in={success}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 2,
            borderRadius: 3,
            background: "linear-gradient(135deg, #cb98bfff 0%, #bea9d3ff 100%)",
            border: "1px solid",
            borderColor: "primary.light",
            boxShadow: "0 8px 32px rgba(142, 68, 173, 0.15)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: "#4CAF50",
                mb: 2,
                animation: "scaleIn 0.5s ease-out",
                "@keyframes scaleIn": {
                  "0%": {
                    transform: "scale(0)",
                    opacity: 0,
                  },
                  "50%": {
                    transform: "scale(1.2)",
                  },
                  "100%": {
                    transform: "scale(1)",
                    opacity: 1,
                  },
                },
              }}
            />
            <Typography
              variant="h5"
              color="purple"
              fontWeight={600}
              sx={{
                animation: "fadeIn 0.5s ease-out",
                "@keyframes fadeIn": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(10px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              Appointment Confirmed!
            </Typography>
          </Box>
          <Alert
            severity="success"
            sx={{
              mb: 2,
              "& .MuiAlert-icon": { fontSize: "2rem" },
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1">
              Successfully booked with Dr. {doctor.name}
            </Typography>
          </Alert>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Redirecting to confirmation page...
          </Typography>
        </Paper>
      </Fade>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 2,
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "background.paper",
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        border: "1px solid",
        borderColor: "primary.light",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background:
            "linear-gradient(90deg, #8E44AD 0%, #9B59B6 50%, #E67E22 100%)",
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 2,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            transform: "rotate(90deg)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Header Part*/}
      <Box
        sx={{
          mb: 4,
          textAlign: "center",
          background:
            "linear-gradient(135deg, #8E44AD 0%, #9B59B6 50%, #E67E22 100%)",
          borderRadius: 2,
          p: 3,
          boxShadow: "0 4px 20px rgba(142, 68, 173, 0.15)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.1)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 1,
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Book Appointment
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            position: "relative",
            zIndex: 1,
          }}
        >
          with Dr. {doctor.name}
        </Typography>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={1} alternativeLabel sx={{ mb: 4 }}>
        <Step>
          <StepLabel>Fill Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Select Time</StepLabel>
        </Step>
        <Step>
          <StepLabel>Confirm</StepLabel>
        </Step>
      </Stepper>

      {/* Form Fields */}
      <Grid container spacing={3}>
        {/* Name Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
            InputProps={{
              startAdornment: (
                <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "primary.main" },
                "&.Mui-focused fieldset": { borderWidth: "2px" },
              },
            }}
          />
        </Grid>

        {/* Email Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={formData.email && !validateEmail(formData.email)}
            helperText={
              formData.email && !validateEmail(formData.email)
                ? "Please enter a valid email address"
                : ""
            }
            disabled={isSubmitting}
            InputProps={{
              startAdornment: (
                <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "primary.main" },
                "&.Mui-focused fieldset": { borderWidth: "2px" },
              },
            }}
          />
        </Grid>

        {/* Phone Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                validatePhoneNumber(value) ||
                value.length < 10
              ) {
                setFormData({ ...formData, phone: value });
              }
            }}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) e.preventDefault();
            }}
            error={formData.phone && !validatePhoneNumber(formData.phone)}
            helperText={
              formData.phone && !validatePhoneNumber(formData.phone)
                ? "Phone number must be exactly 10 digits"
                : ""
            }
            inputProps={{ maxLength: 10 }}
            disabled={isSubmitting}
            InputProps={{
              startAdornment: (
                <PhoneIcon sx={{ mr: 1, color: "primary.main" }} />
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "primary.main" },
                "&.Mui-focused fieldset": { borderWidth: "2px" },
              },
            }}
          />
        </Grid>

        {/* Date Field */}
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Appointment Date"
              value={formData.date}
              onChange={(newDate) =>
                setFormData({ ...formData, date: newDate })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required
                  disabled={isSubmitting}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <EventIcon sx={{ mr: 1, color: "primary.main" }} />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": { borderColor: "primary.main" },
                      "&.Mui-focused fieldset": { borderWidth: "2px" },
                    },
                  }}
                />
              )}
              minDate={new Date()}
            />
          </LocalizationProvider>
        </Grid>

        {/* Time Field */}
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Appointment Time"
              value={formData.time}
              onChange={(newTime) =>
                setFormData({ ...formData, time: newTime })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required
                  disabled={isSubmitting}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <AccessTimeIcon sx={{ mr: 1, color: "primary.main" }} />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": { borderColor: "primary.main" },
                      "&.Mui-focused fieldset": { borderWidth: "2px" },
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      {/* Error Alert */}
      {error && (
        <Fade in={!!error}>
          <Alert
            severity="error"
            sx={{
              mt: 3,
              borderRadius: 2,
              "& .MuiAlert-icon": { fontSize: "1.5rem" },
            }}
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        fullWidth
        sx={{
          mt: 4,
          py: 2,
          fontSize: "1.2rem",
          fontWeight: 600,
          borderRadius: 3,
          background:
            "linear-gradient(45deg, #8E44AD 0%, #9B59B6 50%, #E67E22 100%)",
          boxShadow: "0 4px 15px rgba(142, 68, 173, 0.3)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(142, 68, 173, 0.4)",
          },
          "&:active": { transform: "translateY(1px)" },
          "&:disabled": { background: "#E8E8E8" },
        }}
      >
        {isSubmitting ? (
          <CircularProgress size={28} color="inherit" />
        ) : (
          "Confirm Booking"
        )}
      </Button>
    </Box>
  );
}

export default AppointmentForm;
