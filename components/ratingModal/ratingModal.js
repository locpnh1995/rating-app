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
