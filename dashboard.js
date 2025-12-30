fetch("http://localhost:5000/api/alerts")
  .then(res => res.json())
  .then(data => {
    document.getElementById("totalAlerts").innerText = data.length;
    document.getElementById("sosAlerts").innerText =
      data.filter(a => a.alertType === "SOS").length;
  });
