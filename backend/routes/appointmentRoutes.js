const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointmentsByDoctor,
  deleteAppointment
} = require("../controllers/appointmentController");
 
router.post("/", createAppointment);
router.get("/", getAppointments);
router.get("/doctor/:doctorId", getAppointmentsByDoctor);
router.delete("/:id", deleteAppointment);
 
module.exports = router;