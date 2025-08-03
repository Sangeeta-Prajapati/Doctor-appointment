// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
 
// dotenv.config();
// connectDB();
 
// const app = express();
 
// // Middlewares
// app.use(cors());
// app.use(express.json());
 
// // Routes
// app.use("/api/appointments", require("./routes/appointmentRoutes"));
 
// const PORT = process.env.PORT || 5000;
 
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS Configuration
app.use(
  cors({
    origin: "https://doctor-appointment-frontend-fxx9.onrender.com", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());

// Routes
app.use("/api/appointments", require("./routes/appointmentRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
