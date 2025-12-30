const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Alert = require("./models/Alert");

const app = express();
app.use(cors());


app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:Women11@women-safety-db.vi08bs7.mongodb.net/?appName=women-safety-db")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));

// 🔹 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Women Safety Backend + Database is running");
});

// 🔹 ADD THIS CODE EXACTLY HERE 
app.post("/api/alerts", async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json({
      message: "Alert saved successfully",
      alert
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving alert",
      error
    });
  }
});
app.get("/api/alerts", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching alerts",
      error
    });
  }
});
// 🔹 GET LATEST SOS ALERT
app.get("/api/alerts/latest/sos", async (req, res) => {
  try {
    const sosAlert = await Alert.findOne({ alertType: "SOS" })
      .sort({ timestamp: -1 });

    if (!sosAlert) {
      return res.status(404).json({
        message: "No SOS alerts found",
      });
    }

    res.status(200).json(sosAlert);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching latest SOS",
      error,
    });
  }
});



// 🔹 SERVER START (THIS MUST BE LAST)
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


