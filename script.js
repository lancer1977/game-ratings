const container = document.getElementById("rating-container");

const rowOffsets = {
  "Gameplay": 281,
  "Challenge": 356,
  "Graphics": 431,
  "Sound": 506
};

const ratingValues = {
  "Gameplay": null,
  "Challenge": null,
  "Graphics": null,
  "Sound": null
};

for (const [category, topOffset] of Object.entries(rowOffsets)) {
  for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");
    div.className = "click-area";
    div.style.left = (160 + i * 83) + "px";
    div.style.top = topOffset + "px";
    div.dataset.offsetX = i * 83;
    div.dataset.offsetY = topOffset;
    div.dataset.category = category;
    div.dataset.value = i + 1;
    container.appendChild(div);

    div.addEventListener("click", () => {
      const selector = document.getElementById("selector_" + category);
      selector.style.left = (160 + parseInt(div.dataset.offsetX)) + "px";
      selector.style.top = parseInt(div.dataset.offsetY) + "px";
      selector.style.display = "block";
      ratingValues[category] = parseInt(div.dataset.value);
      document.getElementById("val_" + category).innerText = div.dataset.value;
    });
  }
}

function submitRatings() {
  const gameTitle = document.getElementById("gameTitle").value.trim() || "Untitled Game";
  const data = {
    game: gameTitle,
    ratings: { ...ratingValues }
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = gameTitle.replace(/\s+/g, "_") + "_rating.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
