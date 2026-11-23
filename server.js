import express from "express";
import "dotenv/config";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

app.post("/api/gift", async (req, res) => {
  try {
    const { userPrompt } = req.body;
    console.log(userPrompt);
    const messages = [
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages,
    });

    res.json({ message: response.choices[0].message.content });
  } catch (err) {
    console.log(err);
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
