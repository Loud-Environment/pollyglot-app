import { setLoading } from "./utils";

// Get UI elements
const translationForm = document.getElementById("translation-form");
const translationTextArea = document.getElementById("user-input");
const submitButton = document.getElementById("submitTextButton");
const translationParagraph = document.getElementById("translation-paragraph");
const translationResultSection = document.getElementById(
  "translation-results-section",
);
const languagesSection = document.getElementById(
  "translation-languages-section",
);

translationForm.addEventListener("submit", handleSubmit);

let currentSubmitButtonState = "translate";

async function handleSubmit(e) {
  if (currentSubmitButtonState === "newGame") {
    translationResultSection.classList.add("hidden");
    languagesSection.classList.remove("hidden");
    translationParagraph.textContent = "";
    translationTextArea.value = "";

    return;
  }

  e.preventDefault();

  const formData = new FormData(translationForm);
  const userPrompt = formData.get("sourceText");
  const chosenLanguage = formData.get("language");

  if (!translationTextArea.value.trim()) {
    submitButton.textContent = "Please write some text first";
    submitButton.style.backgroundColor = "red";

    setTimeout(() => {
      submitButton.textContent = "Translate";
      submitButton.style.backgroundColor = "#035a9d";
    }, 2500);

    return;
  }

  try {
    setLoading(true);

    const response = await fetch("/api/gift", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userPrompt, chosenLanguage }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      throw new Error("Server error");
    }

    translationParagraph.textContent = message;
  } catch (err) {
    console.log(err);
    translationParagraph.textContent =
      "Sorry, something went wrong on our side! Please try again.";
  } finally {
    setLoading(false);
    currentSubmitButtonState = "newGame";
  }
}
