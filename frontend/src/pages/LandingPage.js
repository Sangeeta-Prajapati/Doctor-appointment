import React, { useState, useEffect } from "react";
import doctorsData from "../data/doctors.json";
import DoctorCard from "../components/DoctorCard";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  CircularProgress,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
 
function LandingPage() {
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDoctors(doctorsData);
      setIsLoading(false);
    };
    fetchDoctors();
  }, []);
 
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #FDF6E9 0%, #FEF9F3 100%)",
        py: { xs: 2, md: 4 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 3, sm: 4, md: 5 },
          position: "relative",
        }}
      >
        {/* Title + Search */}
        <Box textAlign="center" mb={{ xs: 4, sm: 5, md: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#2C3E50",
              fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3rem" },
              mb: 2,
            }}
          >
            Find Your Trusted Doctor
          </Typography>
 
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by doctor's name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              maxWidth: { xs: "100%", sm: 500, md: 600 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "background.paper",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#E67E22" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
 
        {isLoading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress size={isMobile ? 40 : 60} sx={{ color: "#E67E22" }} />
          </Box>
        ) : (
          <Grid
            container
            spacing={2}
            alignItems="stretch"
            justifyContent="center"
          >
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  key={doctor.id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box sx={{ width: "100%", maxWidth: 250 }}>
                    <DoctorCard doctor={doctor} isMobile={isMobile} />
                  </Box>
                </Grid>
              ))
            ) : (
              <Box textAlign="center" mt={4}>
                <Typography variant="h6" color="text.secondary">
                  No doctors found matching your search.
                </Typography>
              </Box>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
 
export default LandingPage;