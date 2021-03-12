function openModal(query) {
  document.querySelector(query).classList.add("open");

  if (query.indexOf(".complaint-step") > -1) {
    onRenderNegativeEmoji();
    onRenderRatedStar();
  }
}

function closeModal(query) {
  document.querySelector(query).classList.remove("open");
}

function resetDataAfterCloseModal() {
  ratingValue = 0;
  document.getElementById("comment-feedback").value = "";

  document.querySelectorAll(".keyword").forEach((keyWordSelected) => {
    keyWordSelected.classList.remove("keyword-selected");
  });
}

function onClickCloseModal() {
  document.querySelectorAll(".modal .close-button").forEach((closeButton) => {
    closeButton.addEventListener("click", (event) => {
      let modalElement = closeButton.parentNode.parentNode;
      if (modalElement) {
        closeModal(`.${modalElement.className.split(" ").join(".")}`);
        resetDataAfterCloseModal();
      }
    });
  });
}
