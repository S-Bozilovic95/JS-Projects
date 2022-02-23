let divOrder = document.querySelector("#order")
let formOrder = document.querySelector("#order form");
let inputCapacity = document.querySelector("#capacity");


function getItem (resource){

    return new Promise((resolve,reject) =>{
        let request = new XMLHttpRequest();

        request.addEventListener("readystatechange",()=>{
            if(request.readyState === 4 && request.status === 200){
                resolve(JSON.parse(request.responseText));
            }else if(request.readyState === 4){
                reject("Could not fetch data");
            }
        })
        
        request.open("GET",resource);
        request.send();
    })

}

function submitForm1(e){
    e.preventDefault();
    let noStock =[];
    let sumWeight = 0;
    let sumPrice = 0;

    getItem("JSON/stock.json")
        // stock
        .then(data => {

            data.forEach(e=>{
                if(e.stock === 0){
                    noStock.push(e);
                }
            })
            return getItem("JSON/weights.json");

        })
        // weights
        .then(data => {

            data.forEach(e =>{
                noStock.forEach(i =>{
                    if(e.id === i.id){
                        sumWeight += e.weight;
                    }
                })
            })

            if(inputCapacity.value < sumWeight){
                divOrder.innerHTML +=`Not enough capacity in truck!<br>Capacity: ${inputCapacity.value}kg<br> Items Weight: ${sumWeight}kg`;
            }else{
                return getItem("JSON/prices.json");
            }

        })
        // prices
        .then(data => {
            data.forEach(e =>{
                noStock.forEach(i =>{
                    if(e.id === i.id){
                        sumPrice += e.price;
                    }
                })
            })
            console.log(sumPrice);
        })
        .catch((err)=>{
            console.log(err);
        })


}

formOrder.addEventListener('submit', submitForm1);
