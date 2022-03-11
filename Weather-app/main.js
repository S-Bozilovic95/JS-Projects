const apiKey = "b41d8378d8be38b87e183995a2c381d1";

let inpuCity = document.querySelector("#inputCity");
let ispis = document.querySelector("#ispis");

function getData(resource){
    
    return new Promise((resolve,reject)=>{
        let request = new XMLHttpRequest();

        request.addEventListener("readystatechange", e =>{
            e.preventDefault();

            if(request.readyState === 4 && request.status ===200){
                resolve(JSON.parse(request.responseText));
            }else{
                reject("No access to data!");
            }
        })

        request.open("GET", resource);
        request.send();
    })
}




async function getWeather(city){
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

    console.log(mainObject.list[0]);
   mainObject.list.forEach((el,i) => {
       if(i%4 ===0){
        ispis.innerHTML += `<div><img src="http://openweathermap.org/img/w/${el.weather[0].icon}.png"><p>${el.main.temp}</p><p>${el.weather[0].description}</p><p>${el.dt_txt}</p></div>`;
       }
   });
    
}

getWeather(`krusevac`);