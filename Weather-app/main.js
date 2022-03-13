// api key
const apiKey = "b41d8378d8be38b87e183995a2c381d1";

// reference
let searchForm = document.querySelector("#searchForm");
let inputCity = document.querySelector("#inputCity");
let container = document.querySelector("#container");
let containerTwo = document.querySelector("#containerTwo");
let fiveDay = document.querySelector("#fiveDay");
let back = document.querySelector("#back");



// current weather
async function getCurrent(city){
    let lat;
    let lon;

    let location = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    .then(function(data){
        return data.json();
     })
    .then(function (obj){
        lat = obj[0].lat;
        lon = obj[0].lon;
        return obj;
    })

  let mainObject = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(function (data){
        return data.json();
    })
    .then(function(obj){
        return obj;
    })

    let current = document.createElement("div");
    current.id = "current";
    current.innerHTML = `<img src="http://openweathermap.org/img/w/${mainObject.weather[0].icon}.png"><div class="row"><h3>${location[0].name}, ${location[0].country} ${mainObject.weather[0].description}</h3><button type="button" class ="show" value="${location[0].name}">5 day forecats</button><p>current temperature: <span>${mainObject.main.temp}C°</span> | min: ${mainObject.main.temp_min}C° | max: ${mainObject.main.temp_max}C° | wind: ${mainObject.wind.speed} m/s | clouds: ${mainObject.clouds.all}% | pressure: ${mainObject.main.pressure} hpa</p><p>Geo coords [${lat}, ${lon}]</p></div>`;
    container.appendChild(current);

    let buttons = document.querySelectorAll(".show");
    buttons.forEach(el =>{
        el.addEventListener("click", e=>{
            e.preventDefault();
            getWeather5(e.currentTarget.value);
        })
    })
}



// five days weather
async function getWeather5(city){
    let lat;
    let lon;

    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    .then(function(data){
        return data.json();
     })
    .then(function (obj){
        lat = obj[0].lat;
        lon = obj[0].lon;
    })
    

    let mainObject = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(function (data){
        return data.json();
    })
    .then(function(obj){
        return obj;
    })

    fiveDay.innerHTML = "";
    mainObject.list.forEach((el,i) => {
       if(i%8 ===0){
            let fiveDayItem = document.createElement("div");
            fiveDayItem.id ="fiveDayItem";
            fiveDayItem.innerHTML = `<img src="http://openweathermap.org/img/w/${el.weather[0].icon}.png"><p>${el.main.temp}</p><p>${el.weather[0].description}</p><p>${el.dt_txt}</p>`;
            fiveDay.appendChild(fiveDayItem);
       }
   });
   containerTwo.style.display= "block";
    
}



// default value
getCurrent(`krusevac`);

containerTwo.addEventListener("click", e=>{
    e.preventDefault();

    if(e.target.id === "back"){
        fiveDay.innerHTML = "";
        containerTwo.style.display = "none";
    }
})


searchForm.addEventListener("submit", e =>{
    e.preventDefault();

    getCurrent(inputCity.value);

});


