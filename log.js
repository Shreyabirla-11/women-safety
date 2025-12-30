fetch("http://localhost:5000/api/alerts")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("logTable");

    data.forEach(alert => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${alert.deviceId}</td>
        <td><span class="badge ${alert.alertType.toLowerCase().includes("sos") ? "sos" :
          alert.alertType.toLowerCase().includes("fall") ? "fall" : "health"}">
          ${alert.alertType}
        </span></td>
        <td>${new Date(alert.timestamp).toLocaleString()}</td>
      `;
      table.appendChild(row);
    });
  });
