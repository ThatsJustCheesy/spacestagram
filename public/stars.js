function createStars(baseAmount, maxRandom) {
  const starTemplate = document.querySelector("#space-star-template");
  const starContainer = document.querySelector("#space-star-container");

  const starCount = baseAmount + Math.random() * maxRandom;
  for (let i = 0; i < starCount; ++i) {
    const star = starTemplate.content.cloneNode(true).firstElementChild;
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    starContainer.appendChild(star);

    setTimeout(() => {
      star.classList.add("fade-in");

      setTimeout(() => {
        star.classList.add("fade-out");
        star.classList.remove("fade-in");

        setTimeout(() => {
          star.remove();
        }, 1000);
      }, 2500 + Math.random() * 4000);
    }, 100);
  }
}

setInterval(createStars.bind(undefined, 2, 5), 350);
createStars(30, 10);
