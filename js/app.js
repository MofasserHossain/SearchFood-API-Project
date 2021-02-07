// function 
document.getElementById("searchBtn").addEventListener("click", () => {
    const inputData = document.getElementById('SearchInput').value;
    apiRequest(inputData);
})

function closeError() {
    const body = document.getElementById("error")
    body.style.display = "none";
}

// api data
async function apiRequest(name) {
    const urlLink = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const responseApi = await fetch(urlLink);
    const data = await responseApi.json()
    getApiData(data);
}

// display items
const getApiData = hunger => {
    const hungerMealList = hunger.meals;
    const foodDiv = document.getElementById("list");
    const inputValue = document.getElementById('SearchInput').value;
    const errorDiv = document.getElementById('error');
    const errorText = document.getElementById('error-heading');
    let foodDetails = '';
    if (inputValue === "") {
        errorText.innerText = "Error! Enter a Food Name";
        errorDiv.style.display = "block";
    } else if (hunger.meals) {
        hungerMealList.forEach(items => {
            // console.log(items);
            const displayMeals = `
            <div onclick="itemDetails('${items.strMeal}')" class="grid">
            <div>
                <img src="${items.strMealThumb}">
                <h3>${items.strMeal}</h3>
            </div>
            </div>
            `;
            foodDetails += displayMeals;
        });
        foodDiv.innerHTML = foodDetails;
    } else {
        errorText.innerText = "Error! Enter Right Food Name";
        errorDiv.style.display = "block";
    }
}


// food details function
const itemDetails = foodItemName => {
    // console.log(itemName);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodItemName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const dataMeal = data.meals[0];
            const showDataInfo = document.getElementById('showMealItem');
            const mealInfo = `
            <div class="singleItem">
            <img src="${dataMeal.strMealThumb}">
            <h3>${dataMeal.strMeal}</h3>
            <p>Ingredients</p>
            <ul class="list-unstyled">
            <li><i class="fas fa-check-square"></i> ${dataMeal.strMeasure1} - ${dataMeal.strIngredient1}</li>
            <li><i class="fas fa-check-square"></i> ${dataMeal.strMeasure2} - ${dataMeal.strIngredient2}</li>
            <li><i class="fas fa-check-square"></i> ${dataMeal.strMeasure3} - ${dataMeal.strIngredient3}</li>
            <li><i class="fas fa-check-square"></i> ${dataMeal.strMeasure4} - ${dataMeal.strIngredient4}</li>
            <li><i class="fas fa-check-square"></i> ${dataMeal.strMeasure5} - ${dataMeal.strIngredient5}</li>
            </ul>
            </div>
            `;
            showDataInfo.innerHTML = mealInfo;
        })
}