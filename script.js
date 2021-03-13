var ratingValue = 0;

// MODAL
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

function onClickOpenInititalModal() {
  document
    .getElementById("open-dialog-button")
    .addEventListener("click", () => {
      onRenderRatingStar();
      openModal(".modal.question-step");
    });
}

// RATING MODAL
function onClickRating(element) {
  const startIconClassName = "star-icon";
  const greyStarClassName = "grey-star-icon";
  const yellowStarClassName = "yellow-star-icon";

  let triggerStarValue = element.getAttribute("data-value");
  ratingValue = parseInt(triggerStarValue, 10);

  element.parentNode
    .querySelectorAll(`.${startIconClassName}`)
    .forEach((childItem, index) => {
      if (childItem.classList.contains(greyStarClassName)) {
        if (index + 1 <= triggerStarValue) {
          childItem.classList.replace(greyStarClassName, yellowStarClassName);
        }
      } else {
        if (childItem.classList.contains(yellowStarClassName)) {
          if (index >= triggerStarValue) {
            childItem.classList.replace(yellowStarClassName, greyStarClassName);
          }
        }
      }
    });

  closeModal(".modal.question-step");
  if (ratingValue > 3) {
    openModal(".modal.positive-rate.final-positive-step");
  } else {
    openModal(".modal.negative-rate.complaint-step");
  }
}

function onRenderRatingStar() {
  let container = document.querySelector(".modal.question-step .rating-stars");

  if (container) {
    container.innerHTML = "";
    new Array(5).fill(1).map((value, index) => {
      let starElement = document.createElement("i");
      let starClassName = "";
      if (index + 1 <= ratingValue) {
        starClassName += "yellow-star-icon";
      } else {
        starClassName += "grey-star-icon";
      }

      starElement.setAttribute("data-value", index + 1);
      starElement.onclick = () => onClickRating(starElement);

      starElement.className = `icon star-icon ${starClassName}`;
      container.appendChild(starElement);
    });
  }
}

// NEGATIVE MODAL
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
  let inputElement = document.getElementById("comment-feedback");
  inputElement.onfocus = () => {
    document.querySelector(
      ".modal.negative-rate.complaint-step .keyword-list"
    ).style.display = "none";
  };

  inputElement.addEventListener("focusout", () => {
    document.querySelector(
      ".modal.negative-rate.complaint-step .keyword-list"
    ).style.display = "flex";
  });

  inputElement.addEventListener("keydown", (event) => {
    if (event.key && event.key.toLocaleLowerCase() === "enter") {
      inputElement.blur();
    }
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
