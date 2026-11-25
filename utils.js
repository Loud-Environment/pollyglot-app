export function setLoading(loadingState) {
  const languagesSection = document.getElementById(
    "translation-languages-section",
  );
  const translationResultSection = document.getElementById(
    "translation-results-section",
  );
  const submitBtn = document.getElementById("submitTextButton");

  if (loadingState) {
    languagesSection.classList.add("hidden");
    translationResultSection.classList.remove("hidden");
    submitBtn.innerHTML = `
        <img
            src="./assets/system-solid-4018-spinner-three-dots-in-reveal.gif"
            class="loading-logo"
        />`;
    submitBtn.disabled = true;
  } else {
    submitBtn.innerHTML = "Start Over";
    submitBtn.disabled = false;
  }
}
