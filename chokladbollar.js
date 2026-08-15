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


ratingButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedRating = Number(button.dataset.rating);
    });
});

let ratingData = JSON.parse(localStorage.getItem("chokladbollarRating"));

if (!ratingData) {
    ratingData = {
        totalVotes: 0,
        totalStars: 0
    };
}

ratingData.totalVotes++;
ratingData.totalStars += selectedRating;

localStorage.setItem(
    "chokladbollarRating",
    JSON.stringify(ratingData)
);

const average =
    ratingData.totalStars / ratingData.totalVotes;