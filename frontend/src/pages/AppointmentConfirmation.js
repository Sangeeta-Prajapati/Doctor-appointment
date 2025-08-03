import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";

function AppointmentConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.appointment) {
    navigate("/");
    return null;
  }

  const { appointment, doctor } = state;

  // Backend now provides a single datetime field
  const appointmentDateTime = new Date(appointment.datetime);
  const appointmentDate = appointmentDateTime.toLocaleDateString();
  const appointmentTime = appointmentDateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 6 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          background: "linear-gradient(to bottom, #FFFFFF 0%, #F5F5F5 100%)",
          border: "1px solid",
          borderColor: "rgba(230, 126, 34, 0.2)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #E67E22 0%, #F39C12 100%)",
          },
        }}
      >
        {/* Header Section */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
          sx={{
            background: "linear-gradient(135deg, #E67E22 0%, #F39C12 100%)",
            py: 3,
            px: 2,
            borderRadius: 2,
            margin: { xs: -2, sm: -3, md: -4 },
            marginBottom: 5,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -15,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderTop: "20px solid #F39C12",
            },
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 60,
              mb: 1.5,
              color: "white",
              filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.2))",
            }}
          />
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "white",
              fontWeight: 700,
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
              mb: 1,
            }}
          >
            Appointment Confirmed!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Your appointment has been successfully scheduled
          </Typography>
        </Box>

        {/* Details Section */}
        <Grid container spacing={4} sx={{ mt: 5 }}>
          {/* Appointment Details */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "rgba(230, 126, 34, 0.1)",
                background: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "#E67E22",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <EventIcon /> Appointment Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: "rgba(230, 126, 34, 0.05)",
                  }}
                >
                  <EventIcon sx={{ mr: 2, color: "#E67E22" }} />
                  <Typography>{appointmentDate}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: "rgba(230, 126, 34, 0.05)",
                  }}
                >
                  <AccessTimeIcon sx={{ mr: 2, color: "#E67E22" }} />
                  <Typography>{appointmentTime}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Doctor Information */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "rgba(230, 126, 34, 0.1)",
                background: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "#E67E22",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PersonIcon /> Doctor Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                    mb: 2,
                  }}
                >
                  Dr. {appointment.doctorName}
                </Typography>
                {doctor?.specialization && (
                  <Chip
                    icon={<LocalHospitalIcon />}
                    label={doctor.specialization}
                    sx={{
                      bgcolor: "#E67E22",
                      color: "white",
                      "& .MuiChip-icon": { color: "white" },
                    }}
                  />
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer Buttons */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              borderColor: "#E67E22",
              color: "#E67E22",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#D35400",
                backgroundColor: "rgba(230, 126, 34, 0.05)",
              },
            }}
          >
            Back to Home
          </Button>
          <Button
            variant="contained"
            onClick={() => window.print()}
            sx={{
              bgcolor: "#E67E22",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": { bgcolor: "#D35400" },
            }}
          >
            Print Details
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AppointmentConfirmation;
