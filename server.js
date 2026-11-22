import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

app.post("/api/gift", (req, res) => {});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
