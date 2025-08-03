import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  styled,
  CardActions,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import AppointmentForm from "./AppointmentForm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: 360,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: theme.shadows[6],
  },
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
  padding: theme.spacing(1.5),
  transition: "all 0.3s ease",
}));

const UniformButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  textTransform: "none",
  fontSize: "0.8rem",
  minHeight: 36,
  padding: "6px 0",
  flex: 1,
}));

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const [openBooking, setOpenBooking] = useState(false);

  const handleBookAppointment = () => setOpenBooking(true);
  const handleCloseBooking = () => setOpenBooking(false);
  const handleViewProfile = () => navigate(`/doctor/${doctor.id}`);

  return (
    <>
      <StyledCard>
        {/* Image Section */}

        <Box sx={{ position: "relative", height: 140 }}>
          <CardMedia
            component="img"
            image={doctor.image}
            alt={doctor.name}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <ImageOverlay>
            <Typography
              variant="subtitle1"
              sx={{
                color: "white",
                fontWeight: 600,
                textShadow: "0px 2px 4px rgba(0,0,0,0.4)",
              }}
            >
              {doctor.name}
            </Typography>
          </ImageOverlay>
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 1.5,
          }}
        >
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            <Chip
              icon={<LocalHospitalIcon />}
              label={doctor.specialization}
              color="primary"
              size="small"
              sx={{ fontWeight: 500 }}
            />
            <Chip
              label={doctor.status}
              color={doctor.status === "Available" ? "success" : "error"}
              size="small"
              sx={{ fontWeight: 500 }}
            />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              flex: 1,
              fontSize: "0.8rem",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
            {doctor.about}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "action.hover",
              borderRadius: 1,
              p: 0.5,
            }}
          >
            <AccessTimeIcon
              sx={{ mr: 0.5, fontSize: "1rem", color: "primary.main" }}
            />
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                color: "text.primary",
                fontWeight: 500,
              }}
            >
              {doctor.availability}
            </Typography>
          </Box>
        </CardContent>

        <Divider />

        <CardActions sx={{ p: 1.5, pt: 1, gap: 1, display: "flex" }}>
          <UniformButton variant="outlined" onClick={handleViewProfile}>
            View Profile
          </UniformButton>
          <UniformButton
            variant="contained"
            disabled={doctor.status !== "Available"}
            onClick={handleBookAppointment}
          >
            Book Now
          </UniformButton>
        </CardActions>
      </StyledCard>

      {/* Booking Modal */}
      <Dialog
        open={openBooking}
        onClose={handleCloseBooking}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, m: { xs: 2, sm: 4 } } }}
      >
        <DialogContent>
          <AppointmentForm doctor={doctor} onClose={handleCloseBooking} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorCard;
