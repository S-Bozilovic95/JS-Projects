let li = document.querySelectorAll("li");
let ul = document.querySelector("ul");
let btn = document.querySelector("button");

// (1. verzija)

// li.forEach(n=>{
//     n.addEventListener(`click`,(e)=>{
//         e.preventDefault;
//     n.classList.toggle("precrtan");
//     });
// });


// 2. verzija

btn.addEventListener("click",(e)=>{
    e.preventDefault;

    let input = document.querySelector("input");
    let elem = input.value;
    let liItem = document.createElement("li");
    let radio = document.querySelector(`input[type="radio"]:checked`);


    if(elem.trim() === ""){
        alert(`wrong input!`);
    }else{

        liItem.innerHTML= elem;
        
        if(radio.value==="pocetak"){
                liItem.innerHTML= elem;
                ul.prepend(liItem);
        }else{
                liItem.innerHTML= elem;
                ul.appendChild(liItem);
        }
    }

    input.value="";

});


ul.addEventListener("click",(e)=>{
    // console.log(e.target,e.target.tagName);
    if(e.target.tagName === 'LI'){
        e.target.remove();
    }
})

