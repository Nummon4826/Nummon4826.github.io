const express = require('express');
const axios = require('axios');
const app = express(); // <== ต้องมี

app.use(express.json()); // สำหรับแปลง JSON จาก Arduino

app.post('/proxy', async (req, res) => {
  console.log("✅ Received from Arduino:", req.body);

  try {
    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbxQsJf1_rWF1QDLWYR3T35JZQ0F-X6FNAgEN7OI7-oQFeXIDuUPa-2uflvfMgT2FkiV/exec',
      req.body
    );
    console.log("✅ Google Response:", response.status);
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error sending to Google Script:", error.message);
    res.sendStatus(500);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server is running on http://localhost:${PORT}`);
});

