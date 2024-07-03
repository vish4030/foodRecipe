const queryString = {
    app_id: 'eb0caccf',
    app_key: '1a544fa4664b33a52f937aadf93cbd36'
};

const fetchData = async (query) => {
    try {
        const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${queryString.app_id}&app_key=${queryString.app_key}`;
        const res = await fetch(baseUrl);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const setRecipeBox = (query) => {
    let allRecipe = "";
    fetchData(query).then((res) => {
        if (res && res.hits) {
            res.hits.forEach((item) => {
                const { label, ingredients, image, calories } = item.recipe;
                const ingredientList = ingredients.map(ingredient => `<li>${ingredient.text}</li>`);

                // Splitting ingredients into two parts: first 4 and the rest
                const firstFourIngredients = ingredientList.slice(0, 3).join('');
                const remainingIngredients = ingredientList.slice(4).join('');

                // Generating the HTML for ingredients
                let ingredientsHtml = `
                    <ul>
                        ${firstFourIngredients}
                    </ul>
                `;

                // Check if there are more than 4 ingredients to show "More" button
                if (ingredientList.length > 4) {
                    ingredientsHtml += `
                        <button class="more-button" onclick="showMoreIngredients(this)">more...</button>
                        <ul class="hidden-ingredients" style="display:none;">
                            ${remainingIngredients}
                        </ul>
                    `;
                }

                allRecipe += `<div class="col-4 col-t-6 col-mp-12 box-recipe">
                    <div class="card">
                        <img class="img-res" src="${image}" alt="${label}">
                        <h4>${label}</h4>
                        ${ingredientsHtml}
                        <p>Calories: ${parseInt(calories)}</p>
                    </div>
                </div>`;
            });
            document.getElementById('food-box').innerHTML = `<h3 class="col-12">${query.charAt(0).toUpperCase() + query.slice(1)} Recipes</h3>` + allRecipe;
        } else {
            document.getElementById('food-box').innerHTML = `<h3 class="col-12">No recipes found for ${query.capitalize()}</h3>`;
        }
    });
};

// Function to show more ingredients on "More" button click
const showMoreIngredients = (button) => {
    const hiddenIngredients = button.nextElementSibling;
    button.style.display = 'none';
    hiddenIngredients.style.display = 'block';
};


const searchRecipe = (event) => {
    event.preventDefault();
    let query = document.getElementById('food');
    setRecipeBox(query.value);
    query.value = "";

};

// Initial call after 1 second
setTimeout(() => { setRecipeBox("Kheer"); }, 1000);