import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Typography,
  Avatar,
  Chip,
  Stack,
  Paper,
  Container,
  Divider,
  Card,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function DoctorProfile({ doctor, onBook }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ width: "100%", mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            color: "#E67E22",
            "&:hover": {
              backgroundColor: "rgba(230, 126, 34, 0.08)",
            },
            textTransform: "none",
            fontWeight: 500,
            fontSize: "1rem",
            px: 2,
            py: 1,
            borderRadius: 2,
          }}
        >
          Go Back
        </Button>
      </Box>

      <Card
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)",
            py: 3,
            px: 4,
            color: "white",
            borderRadius: "16px 16px 0 0",
            boxShadow: "0 4px 20px rgba(44, 62, 80, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Doctor Profile
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            p: 4,
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: 240, md: 300 },
              height: { xs: 240, md: 300 },
            }}
          >
            <Avatar
              src={doctor.image}
              alt={doctor.name}
              sx={{
                width: "100%",
                height: "100%",
                boxShadow: 3,
                border: "4px solid white",
              }}
            />
            <Chip
              label={doctor.status}
              color={doctor.status === "Available" ? "success" : "error"}
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                fontWeight: "bold",
              }}
            />
          </Box>

          <Stack spacing={3} flex={1}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  color: "primary.main",
                }}
              >
                {doctor.name}
              </Typography>

              <Chip
                icon={<LocalHospitalIcon />}
                label={doctor.specialization}
                color="secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: "1rem",
                  py: 1,
                  bgcolor: "secondary.main",
                  color: "white",
                  "& .MuiChip-icon": {
                    color: "white",
                  },
                }}
              />
            </Box>

            <Divider sx={{ borderColor: "primary.light", opacity: 0.2 }} />

            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "success.main",
                }}
              >
                About
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.7,
                  color: "grey",
                  fontSize: { xs: "0.9rem", md: "1.5rem" },
                }}
              >
                {doctor.about}
              </Typography>
            </Box>

            <Paper
              elevation={1}
              sx={{
                p: 2,
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "primary.light",
                borderRadius: 2,
                opacity: 0.9,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <AccessTimeIcon color="primary" sx={{ fontSize: 28 }} />
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    Availability
                  </Typography>
                  <Typography variant="body2">{doctor.availability}</Typography>
                </Box>
              </Box>
            </Paper>

            {doctor.status === "Available" && (
              <Button
                variant="contained"
                color="secondary"
                onClick={onBook}
                size="large"
                startIcon={<PersonIcon />}
                sx={{
                  mt: 2,
                  py: 1.5,
                  maxWidth: 250,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: 2,
                  background:
                    "linear-gradient(45deg, #E74C3C 30%, #EC7063 90%)",
                  boxShadow: "0 3px 15px rgba(231, 76, 60, 0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 5px 20px rgba(231, 76, 60, 0.4)",
                    background:
                      "linear-gradient(45deg, #C0392B 30%, #E74C3C 90%)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Book Appointment
              </Button>
            )}
          </Stack>
        </Box>
      </Card>
    </Container>
  );
}

export default DoctorProfile;
