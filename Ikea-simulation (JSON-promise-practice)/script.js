
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

// 1.
let divOrder = document.querySelector("#order")
let formOrder = document.querySelector("#order form");
let inputCapacity = document.querySelector("#capacity");
let ispis1 = document.querySelector("#ispis1");


function submitForm1(e){
    e.preventDefault();
    let noStock =[];
    let sumWeight = 0;
    let sumPrice = 0;

    getItem("JSON/stock.json")
        // stock
        .then(data => {

            data.forEach(e=>{
                if(e.stock <= 0){
                    noStock.push(e.id);
                }
            });
            return getItem("JSON/weights.json");

        })
        // weights
        .then(data => {

            data.forEach(e =>{
                if(noStock.includes(e.id)){
                    sumWeight += e.weight;
                }
            });

            if(inputCapacity.value < sumWeight){
                ispis1.innerHTML =`<p>Not enough capacity in truck!<br>Capacity: ${inputCapacity.value}kg<br> Items Weight: ${sumWeight}kg</p>`;
            }else{
                return getItem("JSON/prices.json");
            }

        })
        // prices
        .then(data => {
            if(data !== undefined){

                ispis1.innerHTML ="";
                data.forEach(e =>{
                    if(noStock.includes(e.id)){
                        sumPrice += e.price;
                        ispis1.innerHTML += `<table>
                                                <tr>
                                                    <td>${e.item}</td>
                                                    <td>${e.price}</td>
                                                </tr>
                                            </table>`
                    }
                });
                ispis1.innerHTML+= `<p> Total price of items that are not on stock is: ${sumPrice} RSD</p>`;
            }

        })
        .catch((err)=>{
            console.log(err);
        })
}

formOrder.addEventListener('submit', submitForm1);







// 2.
let divSearch = document.querySelector("#search");
let formSearch = document.querySelector("#search form");
let itemName = document.querySelector("#item");
let minPrice = document.querySelector("#min");
let maxPrice = document.querySelector("#max");
let ispis = document.querySelector("#ispis");



async function checkItems(){
    let data1 = await getItem("JSON/stock.json");
    let data2 = await getItem("JSON/prices.json");
    let itemsOnStock = [];
    let table = document.createElement("table");

    data1.forEach(e =>{
        if(e.stock>0){
            itemsOnStock.push(e.id);
        }
    });

    data2.forEach(e =>{
       if(itemsOnStock.includes(e.id) && e.item.includes(itemName.value) && e.price >= minPrice.value && e.price <= maxPrice.value){
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            td1.innerHTML = e.item;
            td2.innerHTML = e.price;

            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
       }
    })

    return table;
}

function print(e){
    e.preventDefault();

    checkItems()
    .then(data =>{
        if(data !== undefined){
            ispis.appendChild(data);
        }
    })
    .catch(err =>{
        console.log(err);
    })
}

formSearch.addEventListener("submit", print);


