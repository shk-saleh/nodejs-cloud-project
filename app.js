const express = require("express");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

let visitors = 0;

app.get("/", (req, res) => {
  visitors++;

  const timestamp = new Date().toLocaleString();

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Cloud Deployment Dashboard</title>

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Inter, Arial, sans-serif;
        background:rgb(12, 13, 17);
        color: white;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
      }

      .container {
        width: 100%;
        max-width: 1100px;
      }

      .header {
        text-align: center;
        margin-bottom: 40px;
      }

      .header h1 {
        font-size: 2.8rem;
        margin-bottom: 10px;
      }

      .header p {
        color: #94a3b8;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
        gap: 20px;
      }

      .card {
        background:rgb(34, 34, 34);
        border-radius: 18px;
        padding: 25px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        transition: transform .2s ease;
      }

      .card:hover {
        transform: translateY(-4px);
      }

      .label {
        color: #94a3b8;
        font-size: 0.9rem;
        margin-bottom: 10px;
      }

      .value {
        font-size: 1.2rem;
        font-weight: semibold;
        word-break: break-word;
      }

      .status {
        color: #22c55e;
      }

      .footer {
        margin-top: 40px;
        text-align: center;
        color: #94a3b8;
      }

      .tech {
        margin-top: 15px;
        display: flex;
        justify-content: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .badge {
        background:rgb(24, 24, 24);
        padding: 8px 14px;
        border-radius: 999px;
      }
    </style>
  </head>

  <body>

    <div class="container">

      <div class="header">
        <h1>Cloud Deployment Dashboard</h1>
        <p>Docker • Kubernetes • AWS EC2 • Amazon ECR</p>
      </div>

      <div class="grid">

        <div class="card">
          <div class="label">Current Timestamp</div>
          <div class="value">${timestamp}</div>
        </div>

        <div class="card">
          <div class="label">Container ID</div>
          <div class="value">${os.hostname()}</div>
        </div>

        <div class="card">
          <div class="label">Visitor Counter</div>
          <div class="value">${visitors}</div>
        </div>

        <div class="card">
          <div class="label">Application Status</div>
          <div class="value status">🟢 Healthy</div>
        </div>

      </div>

    </div>

  </body>
  </html>
  `);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date(),
    container: os.hostname()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port \${PORT}`);
});