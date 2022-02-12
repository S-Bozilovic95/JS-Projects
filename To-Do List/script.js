let li = document.querySelectorAll("li");


li.forEach(n=>{
    n.addEventListener(`click`,(e)=>{
    n.classList.toggle("precrtan");
    });
});

