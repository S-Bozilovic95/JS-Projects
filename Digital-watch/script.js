
let time = document.querySelector("#watch");
let ispis = document.querySelector("#ispis");
let themes = document.querySelector(".themes");
let watch = null;

time.addEventListener("click",(e)=>{
    e.preventDefault();

    if(e.target.id === "on"){
        
        if(watch === null){
            watch = setInterval(()=>{
                let date = new Date();
                let sati = String(date.getHours()).padStart(2,"0");
                let minuti = String(date.getMinutes()).padStart(2,"0");
                let sekunde = String(date.getSeconds()).padStart(2,"0");
    
                ispis.innerHTML = `${sati}:${minuti}:${sekunde}`;
    
            },1000);
        }

    }else if(e.target.id === "pause"){
        clearInterval(watch);
        watch = null;
    }

})


themes.addEventListener("click",(e)=>{
    e.preventDefault();

    if(e.target.id === "light"){
        time.classList.remove("light");
        time.classList.remove("dark");
        time.classList.toggle("light");
    }else if(e.target.id ==="dark"){
        time.classList.remove("light");
        time.classList.remove("dark");
        time.classList.toggle("dark");
    }
})