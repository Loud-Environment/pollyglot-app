import express from "express";
import OpenAI from "openai";
import "dotenv/config";

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

app.post("/api/gift", async (req, res) => {
  try {
    const { userPrompt, chosenLanguage } = req.body;

    const messages = [
      {
        role: "system",
        content: `
          You are a professional translator.
          A user is going to give you text for translation.
          You should translate it in ${chosenLanguage}.
          Exclude any preambles or conclusions.
          Only send the most adequate translation.
        `,
      },
    ];

    messages.push({
      role: "user",
      content: userPrompt,
    });

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages,
    });

    res.json({ message: response.choices[0].message.content });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Sorry, something went wrong on our side! Please try again",
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
