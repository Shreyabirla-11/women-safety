const API_BASE = "http://localhost:5000/api";

/* LOAD ALERTS */
async function loadAlerts() {
  const res = await fetch(`${API_BASE}/alerts`);
  const data = await res.json();

  const alertsDiv = document.getElementById("alerts");
  if (!alertsDiv) return;

  alertsDiv.innerHTML = "";

  let firstSOS = true;

  data.forEach(alert => {
    const div = document.createElement("div");
    div.classList.add("alert");

    if (alert.alertType === "SOS" && firstSOS) {
      div.classList.add("sos");
      firstSOS = false;
    } else if (alert.alertType.includes("Fall")) {
      div.classList.add("fall");
    } else {
      div.classList.add("health");
    }

    div.innerHTML = `
      <strong>Device ID:</strong> ${alert.deviceId || "N/A"}<br>
      <strong>Alert Type:</strong> ${alert.alertType}<br>
      <strong>Heart Rate:</strong> ${alert.heartRate || "N/A"} BPM<br>
      <strong>Location:</strong> ${
        alert.latitude ? `${alert.latitude}, ${alert.longitude}` : "N/A"
      }<br>
      <strong>Time:</strong> ${new Date(alert.timestamp).toLocaleString()}
    `;

    alertsDiv.appendChild(div);
  });
}

/* DASHBOARD */
async function loadDashboard() {
  const res = await fetch(`${API_BASE}/alerts`);
  const data = await res.json();

  document.getElementById("totalAlerts").innerText = data.length;
  document.getElementById("sosCount").innerText =
    data.filter(a => a.alertType === "SOS").length;
}

/* LOGS */
async function loadLogs() {
  const res = await fetch(`${API_BASE}/alerts`);
  const data = await res.json();

  const tbody = document.getElementById("logBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  data.forEach(a => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.deviceId || "N/A"}</td>
      <td>${a.alertType}</td>
      <td>${a.heartRate || "-"}</td>
      <td>${new Date(a.timestamp).toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
}
