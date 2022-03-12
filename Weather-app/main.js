// api key
const apiKey = "b41d8378d8be38b87e183995a2c381d1";

// reference
let searchForm = document.querySelector("#searchForm");
let inputCity = document.querySelector("#inputCity");
let ispis = document.querySelector("#ispis");
let ul = document.querySelector("ul");



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

    console.log(mainObject.list);
   mainObject.list.forEach((el,i) => {
       if(i%8 ===0){
        ispis.innerHTML += `<div><img src="http://openweathermap.org/img/w/${el.weather[0].icon}.png"><p>${el.main.temp}</p><p>${el.weather[0].description}</p><p>${el.dt_txt}</p></div>`;
       }
   });
    
}


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
    console.log(location[0]);
    

  let mainObject = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(function (data){
        return data.json();
    })
    .then(function(obj){
        return obj;
    })

    console.log(mainObject);
    let li = document.createElement("li");
    li.innerHTML =  `<img src="http://openweathermap.org/img/w/${mainObject.weather[0].icon}.png"><div class="row"><h3>${location[0].name}, ${location[0].country} ${mainObject.weather[0].description}</h3><p>current temperature: <span>${mainObject.main.temp}C°</span> | min: ${mainObject.main.temp_min}C° | max: ${mainObject.main.temp_max}C° | wind: ${mainObject.wind.speed} m/s | clouds: ${mainObject.clouds.all}% | pressure: ${mainObject.main.pressure} hpa</p><p>Geo coords [${lat}, ${lon}]</p></div>`;
    ul.appendChild(li);
    ispis.appendChild(ul);

}

// getWeather5(`krusevac`);

// default value
getCurrent(`krusevac`);
{/* <span><p>${mainObject.main.temp}</p><p>${mainObject.weather[0].description}</p><span>` */}



searchForm.addEventListener("submit", e =>{
    e.preventDefault();

    getCurrent(inputCity.value);
});