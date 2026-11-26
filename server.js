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
          Always follow the target language grammar rules and syntaxis.
          Never put white spaces before exclamation marks and other
          punctuation characters when not necessary according to the target language grammar rules.
          If you don't know a certain slang word or neologism, search the web first instead of making assumptions.
          Try to be as close to the original tone of voice as possible and never censor the translation.
          If you don't know a word, never use a transliteration or transcription. Try to find a local version of a word
          with the same meaning or translate descriptively.
        `,
      },
    ];

    messages.push({
      role: "user",
      content: userPrompt,
    });

    const response = await openai.responses.create({
      model: process.env.AI_MODEL,
      input: messages,
      tools: [{ type: "web_search_preview" }],
      temperature: 1.3,
      top_p: 0.9,
    });

    res.json({ message: response.output_text });
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
