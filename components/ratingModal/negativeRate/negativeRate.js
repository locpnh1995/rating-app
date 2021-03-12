const KEY_WORDS = [
  "청소년 제한 문제",
  "라이브 렉/튕김 문제",
  "라이브콜 기능",
  "직관적이지 못함",
  "서비스 장애",
  "신고 및 제재",
  "환전수수료 불만",
  "고객센터 미흡",
  "캐스트 업로드 기능",
  "19금 콘텐츠/이슈",
  "기타",
];

function onClickKeyWord(element) {
  let selectedClassName = "keyword-selected";

  if (element.classList.contains(selectedClassName)) {
    element.classList.remove(selectedClassName);
  } else {
    element.classList.add(selectedClassName);
  }
}

function onRenderKeyWords() {
  let container = document.querySelector(".modal.negative-rate .keyword-list");

  if (container) {
    KEY_WORDS.map((keyWordText) => {
      let keyWordElement = document.createElement("div");
      keyWordElement.className = "keyword";
      keyWordElement.innerText = keyWordText;
      keyWordElement.onclick = () => onClickKeyWord(keyWordElement);

      container.appendChild(keyWordElement);
    });
  }
  // "icon star-icon grey-star-icon"
}

function onRenderRatedStar() {
  let container = document.querySelector(".modal.negative-rate .rated-stars");

  if (container) {
    container.innerHTML = "";
    new Array(5).fill(1).map((value, index) => {
      let starElement = document.createElement("i");
      let starClassName = "";
      if (index + 1 <= ratingValue) {
        starClassName = "yellow-star-icon";
      } else {
        starClassName = "grey-star-icon";
      }

      starElement.className = `icon star-icon ${starClassName} disabled`;
      container.appendChild(starElement);
    });
  }
}

function onRenderNegativeEmoji() {
  let container = document.querySelector(
    ".modal.negative-rate .negative-emoji"
  );

  if (container) {
    let emojiIcon = container.querySelector(".icon");
    let mainText = container.querySelector(".main-text");

    if (ratingValue <= 2) {
      emojiIcon.classList.add("sad-emoji-icon");
      mainText.innerHTML = `“별로예요”`;
    } else {
      if (ratingValue === 3) {
        emojiIcon.classList.add("not-bad-emoji-icon");
        mainText.innerHTML = `“그냥 그래요”`;
      }
    }
  }
}

function onClickSubmitFeedBack() {
  document
    .querySelector(
      ".modal.negative-rate.complaint-step .submit-feedback-button"
    )
    .addEventListener("click", () => {
      openModal(".modal.negative-rate.final-step");
      closeModal(".modal.negative-rate.complaint-step");
    });
}

function onFocusInTextInput() {
  document.getElementById("comment-feedback").onfocus = () => {
    document.querySelector(
      ".modal.negative-rate.complaint-step .keyword-list"
    ).style.display = "none";
  };

  document
    .getElementById("comment-feedback")
    .addEventListener("focusout", () => {
      document.querySelector(
        ".modal.negative-rate.complaint-step .keyword-list"
      ).style.display = "flex";
    });
}
