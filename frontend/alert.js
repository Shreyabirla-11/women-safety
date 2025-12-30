fetch(`${API_BASE}/api/alerts`)
  .then(res => res.json())
  .then(alerts => {
    const container = document.getElementById("alerts");
    alerts.forEach(a => {
      const div = document.createElement("div");
      div.className = `card alert ${a.alertType.toLowerCase().includes("fall") ? "fall" :
        a.alertType === "SOS" ? "sos" : "health"}`;

      div.innerHTML = `
        <b>${a.alertType}</b><br>
        Device: ${a.deviceId}<br>
        HR: ${a.heartRate}<br>
        Time: ${new Date(a.timestamp).toLocaleString()}
      `;
      container.appendChild(div);
    });
  });
