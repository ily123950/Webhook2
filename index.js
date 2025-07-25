const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Чтобы принимать query-параметры
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const msg = req.query.msg || "Hello from Roblox!";
  const webhook = "https://discord.com/api/webhooks/1397128927222169690/RMNYuy4W6sY9jhQX6t7EJRhI1fpAI3iNIV88PnRToi7LKKm-drsTeiLQ1O8ZgJAfOl-J";

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: msg })
    });

    if (!response.ok) {
      return res.status(500).send("Failed to send");
    }

    res.send("Sent to Discord!");
  } catch (error) {
    res.status(500).send("Error sending to Discord");
  }
});

app.listen(PORT, () => {
  console.log(`Discord proxy is running on port ${PORT}`);
});
