document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let scrollAmount = 0;

    prevButton.addEventListener("click", () => {
        scrollAmount -= 150;
        carousel.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: "smooth"
        });
    });

    nextButton.addEventListener("click", () => {
        scrollAmount += 150;
        carousel.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: "smooth"
        });
    });
});
