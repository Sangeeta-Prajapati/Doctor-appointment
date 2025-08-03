const Appointment = require("../models/Appointment");
 
// Create a new appointment
exports.createAppointment = async (req, res) => {
  
  try {
    console.log("REQ.BODY", req.body);
    const { doctorId, doctorName, patientName, patientEmail,phone, datetime } = req.body;
 
    if (!doctorId || !doctorName || !patientName || !patientEmail || !phone || !datetime) {
      return res.status(400).json({ message: "All fields are required" });
    }
 
    const newAppointment = new Appointment({
      doctorId,
      doctorName,
      patientName,
      patientEmail,
      phone,
      datetime,
      status: "Pending",
    });
 
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// Get appointments by doctor ID
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};