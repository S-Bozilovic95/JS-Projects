let buttons = document.querySelector("#buttons");
let res = document.querySelector("#res")
let passTime = document.querySelector("#passTime");
let stopper = null; 
let min = 0;
let sec = 0;
let stot = 0;
let br = 0;

buttons.addEventListener("click",e =>{
    e.preventDefault();

    if(e.target.id === "start"){

        if(stopper===null){
            stopper = setInterval(function(){
                stot++;
                if(stot===100){
                    stot = 0;
                    sec++;
                }
    
                if(sec===60){
                    sec = 0;
                    min++;
                }

                stot = String(stot).padStart(2,"0");
                sec = String(sec).padStart(2,"0");
                min = String(min).padStart(2,"0");
    
                res.innerHTML = `${min}:${sec}.${stot}`;
    
            },1000 / 100)
        }
    }

    if(e.target.id === "pass"){
        br++;
        let ul = document.createElement("ul");
        let li = document.createElement ("li");

        stot = String(stot).padStart(2,"0");
        sec = String(sec).padStart(2,"0");
        min = String(min).padStart(2,"0");

        let time = document.createTextNode(`${br}. - ${min}:${sec}.${stot}`);

        li.appendChild(time);
        ul.appendChild(li);
        passTime.appendChild(ul);
    }

    if(e.target.id === "pause"){
        clearInterval(stopper);
        stopper = null;
    }

    if(e.target.id ==="reset"){
        clearInterval(stopper);
        min = 0;
        sec = 0;
        stot =0;
        br = 0
        res.innerHTML = `00:00.00`;
        passTime.innerHTML = "";
        stopper = null;
    }
})
