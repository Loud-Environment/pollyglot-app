// Get UI elements
const translationForm = document.getElementById("translation-form");
const translationTextArea = document.getElementById("user-input");
const submitButton = document.getElementById("submitTextButton");

translationForm.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
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

  const response = await fetch("/api/gift", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userPrompt, chosenLanguage }),
  });

  const { message } = await response.json();
  console.log(message);
}
