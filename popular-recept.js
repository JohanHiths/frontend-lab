fetch("recept.json")
    .then(response => response.json())
    .then(recept => {

        const recipeList =
            document.getElementById("recipe-list");

        const popularaRecept = recept
            .map(recipe => {

                const savedRating = localStorage.getItem(
                    `${recipe.id}Rating`
                );

                const rating = savedRating
                    ? JSON.parse(savedRating)
                    : {
                        totalVotes: 0,
                        totalStars: 0
                    };

                const average = rating.totalVotes > 0
                    ? rating.totalStars / rating.totalVotes
                    : 0;

                return {
                    ...recipe,
                    average,
                    totalVotes: rating.totalVotes
                };
            })

            .sort((a, b) => b.average - a.average);


        popularaRecept.forEach((recipe, index) => {

            const recipeElement =
                document.createElement("a");

            recipeElement.classList.add("recipe-card");

            recipeElement.href = recipe.url;

            recipeElement.innerHTML = `
                <div class="ranking">
                    ${getMedal(index)}
                </div>

                <img
                    src="${recipe.bild}"
                    alt="${recipe.namn}"
                    class="recipe-card-image"
                >

                <h3>${recipe.namn}</h3>

                <p>${recipe.kategori}</p>

                <p>
                    ⭐ ${recipe.average.toFixed(1)}
                    (${recipe.totalVotes} röster)
                </p>

                <p>⏳ ${recipe.tid} min</p>
                <p>🍳 ${recipe.portioner} stycken</p>
            `;

            recipeList.appendChild(recipeElement);
        });
    });


function getMedal(index) {

    if (index === 0) {
        return "🥇";
    }

    if (index === 1) {
        return "🥈";
    }

    if (index === 2) {
        return "🥉";
    }

    return "";
}
