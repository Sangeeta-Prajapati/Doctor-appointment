import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Container,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";

function Navbar() {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "rgba(230, 126, 34, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.5,
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              sx={{
                mr: 1,
                color: "#E67E22",
                "&:hover": {
                  backgroundColor: "rgba(230, 126, 34, 0.08)",
                },
              }}
            >
              <LocalHospitalIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#2C3E50",
                letterSpacing: "-0.5px",
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(45deg, #E67E22 30%, #F39C12 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HealthCare+
            </Typography>
          </Link>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
                color: location.pathname === "/" ? "#E67E22" : "#7F8C8D",
                "&:hover": {
                  backgroundColor: "rgba(230, 126, 34, 0.08)",
                  color: "#E67E22",
                },
                fontWeight: location.pathname === "/" ? 600 : 400,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Home
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}

export default Navbar;