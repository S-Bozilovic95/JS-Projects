// pitanja

let pitanje1 ={
    tekst: `Koliko će svetlosnih godina trebati da svemirska letilica lansirana zemlje stigne na pluton?`,
    odgovori: [1.3 , 2 , 4.1 , 2.5],
    tacanOdg: 3,
};

let pitanje2 ={
    tekst: `Koja planeta je najtoplija u Sunčevom sistemu?`,
    odgovori: [`Mars` , `Jupiter` , `Saturn` , `Venera`],
    tacanOdg: 3,
};

let pitanje3 ={
    tekst: `U kojoj zemlji je izumljena Cezar salata?`,
    odgovori: [`Francuska` , `Italija` , `Meksiko` , `SAD`],
    tacanOdg: 2,
};

let pitanje4 ={
    tekst: `Šta se meri Skovil (Scoville) jedinicom?`,
    odgovori: [`reflekcija` , `tvrdoća` , `ljutina` ,`gustina`],
    tacanOdg: 2,
};

let pitanje5 ={
    tekst: `U kom gradu u SAD je otvoren prvi "Starbucks"?`,
    odgovori: [`Sijetl` , `Detroit` , `Las Vegas` , `Njujork`],
    tacanOdg: 0,
};

let pitanje6 ={
    tekst: `U kojoj državi ima najvise vulkana?`,
    odgovori: [`Italija` , `Japan` , `Indonezija` , `Filipini`],
    tacanOdg: 3,
};

let pitanje7 ={
    tekst: `Iz koje zemlje dolazi čuveno pivo "Heineken"?`,
    odgovori: [`Danska` , `Holandija` , `Nemačka` , `Belgija`],
    tacanOdg: 1,
};

let pitanje8 ={
    tekst: `Akrofobija je strah od:`,
    odgovori: [`paukova`, `visine` , `dubine` , `mraka`],
    tacanOdg: 3,
};

let pitanje9 ={
    tekst: `Bitka kod Velbužda odigrala se 28. Jula koje godine?`,
    odgovori: [`1330.` , `1354.` , `1346.` , `1333.`],
    tacanOdg: 0,
};

let pitanje10 ={
    tekst: `Koje godine p.n.e. je rođen Aleksandar Makedonski?`,
    odgovori: [`350.` , `356.` , `321.` , `480.`],
    tacanOdg: 1,
};

let pitanje11 ={
    tekst: `Koliko Saturn ima prstenova?`,
    odgovori: [7 , 5 , 3 , 9],
    tacanOdg: 0,
};

let pitanje12 ={
    tekst: `Koliko je širok Gibraltarski moreuz?`,
    odgovori: [`4km` , `7km` , `18km` , `14km`],
    tacanOdg: 3,
};

let pitanje13 ={
    tekst: `Koja država se suprotsavila Francuskoj i Engleskoj u Opijumskum ratovima?`,
    odgovori: [`Indija` , `Koreja` , `Kina` , `Mjanmar`],
    tacanOdg: 2,
};

let pitanje14 ={
    tekst: `Koje godine se odigrala Kolubarska bitka?`,
    odgovori: [`1916.` , `1914.` , `1915.` , `1917.`],
    tacanOdg: 1,
};

let pitanje15 ={
    tekst: `Koji Nemanjić je podigao najveći broj zadužbina?`,
    odgovori: [`Stefan Uroš III Dečanski` , `Stefan Uroš II Milutin` , `Stefan Prvovenčani` , `Stefan Vladislav`],
    tacanOdg: 1,
};

// niz
nizPitanja = [pitanje1,pitanje2,pitanje3,pitanje4,pitanje5,pitanje6,pitanje7,pitanje8,pitanje9,pitanje10,pitanje11,pitanje12,pitanje13,pitanje14,pitanje15];



// funkcije
function ispis (nizPitanja){
    let div = document.querySelector(".kviz");
    let br =0;

    
    nizPitanja.forEach(e => {
        let artikal = document.createElement("article");
        artikal.innerHTML += `<h2>${br+=1}. ${e.tekst}</h2>`;

        e.odgovori.forEach((n,i)=>{
            if(i==e.tacanOdg){
                artikal.innerHTML += `<input type="radio" name="odg${br}" class="tacno"><label for="odg">${n}</label><br>`;
            }else{
                artikal.innerHTML += `<input type="radio" name="odg${br}"><label for="odg">${n}</label><br>`;
            }
        });
        div.appendChild(artikal);
    });
}



function izbaciPitanja (){
    let noviNiz =[];

    while(noviNiz.length <5){

        let rand = nizPitanja[Math.floor(Math.random()*nizPitanja.length)];

        if(!noviNiz.includes(rand)){
            noviNiz.push(rand);
        }
    }

    ispis(noviNiz);
}



// ispis
window.addEventListener("load",izbaciPitanja(nizPitanja));

// svaki prvi cekiran
let odg2 = document.querySelectorAll("input[type='radio']");
odg2.forEach((n,i)=>{
    if(i%4==0){
        n.checked= true;
    }
});


// Dugmad
// 1.
let subBtn = document.querySelector("button[type='submit']");


subBtn.addEventListener("click",(e)=>{
    e.preventDefault;
    let odg = document.querySelectorAll("input[type='radio']:checked");
    let rez = document.querySelector(".rez");

    
        odg.forEach((n,i)=>{
            if(n.classList.contains("tacno")){
                rez.innerHTML += `<p style="color:green;">tacno ste odgovorili na ${i+=1}. pitanje</p>`;
            }else{
                rez.innerHTML += `<p style="color:red;">niste tacno odgovorili na ${i+=1}. pitanje</p>`;
            }
        })

    odg2.forEach(n=>{
        n.disabled = true;
    })

    subBtn.disabled = true;
    rez.style.display ="block";
})


//2.
let reset = document.querySelector("button[type='reset']");

reset.addEventListener("click",(e)=>{
        e.preventDefault;
        document.location.reload();
})