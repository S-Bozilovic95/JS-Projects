const apiKey = "b41d8378d8be38b87e183995a2c381d1";
// const apiKey ="4fced5fdb22dc1bd31f09bc568ffd9fd";
let inpuCity = document.querySelector("#inputCity");

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



fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${`krusevac`}&limit=1&appid=${apiKey}`)
.then(function(data){
   return data.json();
})
.then(function(obj){
    console.log(obj);
    obj.forEach(el => {
        console.log();
    });
})