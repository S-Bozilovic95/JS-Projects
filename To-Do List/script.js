let li = document.querySelectorAll("li");
let ul = document.querySelector("ul");
// let btn = document.querySelector("button");
let input = document.querySelector("input[type='text']");

// (1. verzija)
// li.forEach(n=>{
//     n.addEventListener(`click`,(e)=>{
//         e.preventDefault;
//     n.classList.toggle("precrtan");
//     });
// });


// 2. verzija
input.addEventListener("keyup",(e)=>{
    e.preventDefault();
    let elem = input.value;
    let liItem = document.createElement("li");
    let radio = document.querySelector(`input[type="radio"]:checked`);

    // e.keyCode je br koji predstavlja svako dugme na tastaturi. Npr enter je broj 13
    if(e.key==`Enter`){
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
            input.value="";
        }  
    }
});


// brisanje stavki
ul.addEventListener("click",(e)=>{
    // console.log(e.target,e.target.tagName);
    if(e.target.tagName === 'LI'){
        e.target.remove();
    }
})

