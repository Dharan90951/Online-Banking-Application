document.getElementById('findRecipes').addEventListener('click', function () {
    let ingredients = document.getElementById('ingredientInput').value.trim();
    if (ingredients) {
        fetchRecipes(ingredients);
    } else {
        alert("Please enter some ingredients!");
    }
});

async function fetchRecipes(ingredients) {
    const apiKey = '77fb77418ca24ecbba1c16bfa5405296'; // Replace with your Spoonacular API key
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('Failed to fetch recipes. Please try again later.');
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = ''; // Clear previous results

    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('col');

        recipeCard.innerHTML = `
            <div class="card">
                <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" class="card-img-top" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">Ready in ${recipe.readyInMinutes} minutes</p>
                    <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank" class="btn btn-info">View Recipe</a>
                </div>
            </div>
        `;

        recipesContainer.appendChild(recipeCard);
    });
}