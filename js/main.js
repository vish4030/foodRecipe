

const queryString = {
    app_id : 'eb0caccf',
    app_key : '1a544fa4664b33a52f937aadf93cbd36'
}

const fetchData = async(query)=>{
    try {
        const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${queryString.app_id}&app_key=${queryString.app_key}`;
        const res = await fetch(baseUrl);
         return res.json();  
    } catch (e) {
        console.log(e,"something went Wrong");
        
    }
}


const searchRecipe =()=>{
    let query = document.getElementById('food');
    let allRecipe="";
    fetchData(query.value).then((res)=>{
        console.log(res.hits[0].recipe);
        res?.hits?.map((item)=>{
            const{label,ingredients,image,calories} = item?.recipe;
            allRecipe += `<div class="col-4 col-t-6 col-mp-12 box-recipe justify-evenly">
            <div class="card">
            <img class="img-res" src=${image} alt=${label}/>
            <h3>${label}</h3>
            <ul>
              <li>${ingredients[0]?.text}</li> 
              <li>${ingredients[1]?.text}</li>
              <li>${ingredients[2]?.text}</li>
              <li>${ingredients[3]?.text}</li>
            </ul>
            <p>Calories: ${parseInt(calories)}</p>
            </div>
          </div>`;
        })

        document.getElementById('food-box').innerHTML = allRecipe;
        query.value = "";
        
    })

}

