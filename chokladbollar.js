const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const modal = document.getElementById("modal");
const ratingAverage = document.getElementById("rating-average");
const ratingCount = document.getElementById("rating-count")
const modalComment = document.querySelectorAll(".modal-comment");
const commentBtn = document.getElementById("comment-btn");
const commentModal = document.getElementById("comment-modal");
const commentCancel = document.getElementById("comment-cancel");
const commentSubmit = document.getElementById("comment-submit");
const commentArea = document.getElementById("comment-area");
const commentMessage = document.getElementById("comment-message");
const commentCount = document.getElementById("comment-count");
const commentsList = document.getElementById("comments-list");
const clearComments = document.getElementById("clear-comments");

const ratingButtons = document.querySelectorAll(".rating-options button");
const submitRating = document.getElementById("submit-rating");
const ratingMessage = document.getElementById("rating-message");


let selectedRating = null;




openBtn.addEventListener("click", () => {
    modal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
});


ratingButtons.forEach(button => {
    button.addEventListener("click", () => {

        console.log("data-rating:", button.dataset.rating);

        selectedRating = Number(button.dataset.rating);

        console.log("selectedRating:", selectedRating);
    });
});

submitRating.addEventListener("click", () => {

    if (selectedRating === null) {
        ratingMessage.textContent = "Välj ett betyg först.";
        ratingMessage.classList.add("show");
        return;
    }

    ratingData.totalVotes++;
    ratingData.totalStars += selectedRating;

    localStorage.setItem(
        "chokladbollarRating",
        JSON.stringify(ratingData)
    );

    console.log("EFTER RÖST:", ratingData);

    const average =
        ratingData.totalStars / ratingData.totalVotes;

    ratingAverage.textContent = average.toFixed(1);
    ratingCount.textContent = `(${ratingData.totalVotes} röster)`;

    ratingMessage.textContent = "✅ Tack för att du röstade!";
    ratingMessage.classList.add("show");
});



let ratingData = JSON.parse(
    localStorage.getItem("chokladbollarRating")
);

if (!ratingData) {
    ratingData = {
        totalVotes: 0,
        totalStars: 0
    };
}

console.log("START:", ratingData);




setTimeout(() => {
    modal.classList.remove("open");
    ratingMessage.classList.remove("show");
}, 1500);


commentBtn.addEventListener("click", () => {
    commentModal.classList.add("open");
});

commentCancel.addEventListener("click", () => {
    commentModal.classList.remove("open");
});

let comments = JSON.parse(
    localStorage.getItem("chokladbollarComments")
);

if (!comments) {
    comments = [];
}

commentSubmit.addEventListener("click", () => {

    const text = commentArea.value.trim();

    if (text === "") {
        commentMessage.textContent =
            "Skriv en kommentar först.";
        return;
    }

    comments.push(text);

    localStorage.setItem(
        "chokladbollarComments",
        JSON.stringify(comments)
    );

    displayComments();

    commentCount.textContent =
        `${comments.length} ${
            comments.length === 1
                ? "kommentar"
                : "kommentarer"
        }`;

    commentMessage.textContent =
        "✅ Tack för din kommentar!";

    commentArea.value = "";

    setTimeout(() => {
        commentModal.classList.remove("open");
        commentMessage.textContent = "";
    }, 1500);



    
});

function displayComments() {

    commentsList.innerHTML = "";

    if (comments.length === 0) {
        commentsList.innerHTML = "<p>Inga kommentarer ännu.</p>";
        return;
    }

    comments.forEach(comment => {

        const commentElement = document.createElement("div");

        commentElement.classList.add("comment");

        commentElement.textContent = comment;

        commentsList.appendChild(commentElement);
    });
}

clearComments.addEventListener("click", () => {

    localStorage.removeItem("chokladbollarComments");

    comments = [];

    displayComments();

    commentCount.textContent = "0 kommentarer";
});