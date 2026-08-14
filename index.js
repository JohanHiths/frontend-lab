const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const modal = document.getElementById("modal");

const ratingButtons = document.querySelectorAll(".rating-options button");
const submitRating = document.getElementById("submit-rating");

let selectedRating = null;




openBtn.addEventListener("click", () => {
    modal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
});


