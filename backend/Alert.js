const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  alertType: {
    type: String,
    enum: ["SOS", "Fall Detection", "Health Update"],
    required: true,
  },
  heartRate: Number,
  latitude: Number,
  longitude: Number,
  signalStrength: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alert", alertSchema);
