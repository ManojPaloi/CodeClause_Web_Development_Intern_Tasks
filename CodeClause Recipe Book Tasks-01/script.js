document.addEventListener("DOMContentLoaded", () => {
    const recipeForm = document.getElementById("recipe-form");
    const recipesContainer = document.getElementById("recipes");

    recipeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const ingredients = document.getElementById("ingredients").value.split(",");
        const instructions = document.getElementById("instructions").value;
        const imageInput = document.getElementById("image");
        const imageFile = imageInput.files[0];

        const reader = new FileReader();
        reader.onload = function() {
            const imageUrl = reader.result;

            const recipe = {
                title,
                ingredients,
                instructions,
                imageUrl,
            };

            saveRecipe(recipe);
            displayRecipes();
            recipeForm.reset();
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    });

    const saveRecipe = (recipe) => {
        const recipes = getRecipes();
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
    };

    const getRecipes = () => {
        const recipes = localStorage.getItem("recipes");
        return recipes ? JSON.parse(recipes) : [];
    };

    const displayRecipes = () => {
        recipesContainer.innerHTML = "";
        const recipes = getRecipes();
        recipes.forEach((recipe) => {
            const recipeCard = document.createElement("div");
            recipeCard.className = "recipe-card";

            const recipeImage = document.createElement("img");
            recipeImage.src = recipe.imageUrl;
            recipeCard.appendChild(recipeImage);

            const recipeTitle = document.createElement("h3");
            recipeTitle.textContent = recipe.title;
            recipeCard.appendChild(recipeTitle);

            const recipeIngredients = document.createElement("p");
            recipeIngredients.innerHTML = `<span>Ingredients:</span> ${recipe.ingredients.join(", ")}`;
            recipeCard.appendChild(recipeIngredients);

            const recipeInstructions = document.createElement("p");
            recipeInstructions.innerHTML = `<span>Instructions:</span> ${recipe.instructions}`;
            recipeCard.appendChild(recipeInstructions);

            recipesContainer.appendChild(recipeCard);
        });
    };

    displayRecipes();
});
