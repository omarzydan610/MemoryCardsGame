document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const level = document.querySelector('input[name="level"]:checked').value;
    const root = document.documentElement;
    const images=["images/image1.png",
    "images/image2.png",
        "images/image3.png",
        "images/image4.png",
        "images/image5.png",
        "images/image6.png",
        "images/image7.png",
        "images/image8.png",
        "images/image9.png",
        "images/image10.png",
        "images/image11.png",
        "images/image12.png"
    ];

    if(name==""){
        document.querySelector(".name span").innerHTML="Anonymous";
    }
    else{
        document.querySelector(".name span").innerHTML=name;
    }
    document.querySelector(".level span").innerHTML=level;

    function shuffleCards(cards) {
        let temp=[];
        for(let i=0;i<cards;i++){
            let temp2=[];
            temp2.push(images[i]);
            temp2.push(i+1);
            temp.push(temp2);
            temp.push(temp2);
        }
        for (let i = temp.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [temp[i], temp[j]] = [temp[j], temp[i]];
        }
        return temp;
    }    
    let cardsNumber;
    if(level==="Easy"){
        cardsNumber=6;
        let temp=shuffleCards(cardsNumber);
        for(let i=0;i<2*cardsNumber;i++){
            document.getElementById("game-area").innerHTML+=`<div class="card is-flipped " data="image${temp[i][1]}"><div class="face front">?</div><div class="face back"><img src=${temp[i][0]} alt="" /></div></div>`
        }
    }
    if(level==="Medium"){
        root.style.setProperty("--main-card-size","18%");
        root.style.setProperty("--sec-card-size","23%");
        cardsNumber=10;
        let temp=shuffleCards(cardsNumber);
        for(let i=0;i<2*cardsNumber;i++){
            document.getElementById("game-area").innerHTML+=`<div class="card is-flipped" data="image${temp[i][1]}"><div class="face front">?</div><div class="face back"><img src=${temp[i][0]} alt="" /></div></div>`
        }
    }
    else if(level==="Hard"){
        root.style.setProperty("--main-card-size","15.5%");
        root.style.setProperty("--sec-card-size","23%");
        cardsNumber=12;
        let temp=shuffleCards(cardsNumber);
        for(let i=0;i<2*cardsNumber;i++){
            document.getElementById("game-area").innerHTML+=`<div class="card is-flipped" data="image${temp[i][1]}"><div class="face front">?</div><div class="face back"><img src=${temp[i][0]} alt="" /></div></div>`
        }
    }

    document.getElementById("splash-screen").style.setProperty("display","none");

    gameplay(cardsNumber,level,name);
    
}
);

function gameplay(cardsNumber,level,name){
    let countValues=[3,2,1,"GO.."];
    for(let i=0;i<4;i++){
        setTimeout(()=>{
            document.querySelector(".counter").innerHTML=countValues[i];
            document.querySelector(".counter").classList.add("show");
        },1000*(i+1))
        setTimeout(()=>{
                document.querySelector(".counter").classList.remove("show");
            },((1000*(i+1))+600))
    }
    setTimeout(()=>{
        document.querySelector(".counter").style.setProperty("display","none");
    },5000)

    if(level==="Easy"){
        setTimeout(()=>{
            document.querySelector(".no-touch").style.setProperty("display","none");
        },5600)
    }
    else if(level==="Medium"){
        setTimeout(()=>{
            document.querySelector(".no-touch").style.setProperty("display","none");
        },6200)
    }
    else{
        setTimeout(()=>{
            document.querySelector(".no-touch").style.setProperty("display","none");
        },6500)
    }
    
    let gameArea = document.querySelector(".game-area");
    let cards= Array.from(gameArea.children);
    let prevData="";
    let prevCard="";
    let miss=0,hit=0;
    copyCards=cards;

    setTimeout(() => {
        for(let i=0;i<cards.length;i++){
            setTimeout(() => {
                cards[i].classList.remove('is-flipped')
            }, 200*i);
        }
        for(let i=0;i<cards.length;i++){
            setTimeout(() => {
                cards[i].classList.remove('is-flipped')
            }, 200*(cards.length-1-i));
        }
    }, 3000);

    function check(currCard,currData){
        console.log(currData+"   "+ prevData);
        if(currData!=null){
            if(prevData===""){
                prevData=currData;
                prevCard=currCard;
            }
            else if(prevData===currData){
                prevData="";
                prevCard="";
                currData="";
                currData="";
                hit++;
                document.getElementById("hit").play();
                
            }
            else{
                currCard.classList.remove('is-flipped');
                prevCard.classList.remove('is-flipped');
                prevData="";
                prevCard="";
                miss++;
                document.querySelector(".miss span").innerHTML=miss;
                document.getElementById("miss").play();
            }
        }
        if(hit===cardsNumber){
            let nm;
            if(name==="Anonymous"){
                nm=""
            }
            else{
                nm=name;
            }
            if(miss<=cardsNumber){
                let res=`Well Done ${nm} You did it with only ${miss} wrong tries!`;
                document.querySelector(".result .result-window").innerHTML=res;
                document.querySelector(".result").style.setProperty("display","block");
                setTimeout(() => {
                    document.querySelector(".result .result-window").classList.add("animate");
                }, 100);
            }
            else{
                let res=`You did it with ${miss} wrong tries, You can do better ${nm}!`;
                document.querySelector(".result .result-window").innerHTML=res;
                document.querySelector(".result").style.setProperty("display","block");
                setTimeout(() => {
                    document.querySelector(".result .result-window").classList.add("animate");
                }, 100);
            }
            setTimeout(() => {
                location.reload();
            }, 4000);
        }
    }

    function flipCard(card,data) {
        card.classList.add('is-flipped');
        setTimeout(() => {
            check(card,data);
        }, 700);
        
    }

    cards.forEach((card) => {
        card.addEventListener('click', function () {
            if(!(card.classList.contains('is-flipped'))){
                flipCard(card,card.getAttribute("data"));
            }
        });
    });
    
}














