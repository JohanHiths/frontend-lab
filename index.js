fetch("recept.json")
    .then(response => response.json())
    .then(recept => {

        const recipeList =
            document.getElementById("recipe-list");

        recept.forEach(recipe => {

            const recipeElement =
                document.createElement("a");

            recipeElement.classList.add("recipe-card");

            recipeElement.href = recipe.url;

            recipeElement.innerHTML = `
                <img
                    src="${recipe.bild}"
                    alt="${recipe.namn}"
                    class="recipe-card-image"
                >

                <h3>${recipe.namn}</h3>

                <p>${recipe.kategori}</p>
                <p>⏳ ${recipe.tid}</p>
                <p>🍳 ${recipe.portioner} stycken</p>
            `;

            recipeList.appendChild(recipeElement);
        });
    });