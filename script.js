var ratingValue = 0;

function onClickOpenInititalModal() {
  document
    .getElementById("open-dialog-button")
    .addEventListener("click", () => {
      onRenderRatingStar();
      openModal(".modal.question-step");
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
  onClickOpenInititalModal();

  onClickCloseModal();
  onClickSubmitFeedBack();

  onFocusInTextInput();

  onRenderKeyWords();
  onRenderRatedStar();

  onRenderNegativeEmoji();
});
