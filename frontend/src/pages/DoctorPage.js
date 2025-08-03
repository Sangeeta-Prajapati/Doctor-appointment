import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Box } from "@mui/material";
import DoctorProfile from "../components/DoctorProfile";
import AppointmentForm from "../components/AppointmentForm";
import doctorsData from "../data/doctors.json";

function DoctorPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    // Find doctor by id
    const foundDoctor = doctorsData.find(doc => doc.id === parseInt(id));
    setDoctor(foundDoctor);
  }, [id]);

  const handleBookClick = () => {
    setShowBooking(true);
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3}>
        <DoctorProfile doctor={doctor} onBook={handleBookClick} />
        
        {showBooking && (
          <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
            <AppointmentForm doctor={doctor} />
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default DoctorPage;