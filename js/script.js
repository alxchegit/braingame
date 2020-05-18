var massive = [];
var answer = document.querySelector("#answer");
var butGO = document.querySelector(".button");
var Out = document.querySelector("#cardArea");
var butAnswer = document.querySelector(".ansBut");
var answerBlock = document.querySelector("#answerBlock");
var gameRegime = document.querySelectorAll("input[name=gameRegime]")
var suits = document.querySelector('#suits');
var numbers = document.querySelector('#numbers');
// for (let i = 1; i <= 52; i++) {
// 	massive.push(i);
// }
function get_cookie (cookie_name){
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' ); 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomShow(razmer, hide) {
  let resultArray = [];
  let check = true;

  while (check) {
    let b = getRandom(1, razmer);
    let chk = false;
    for (let i = 0; i <= resultArray.length - 1; i++) {
      if (resultArray[i] == b) {
        chk = true;
      }
    }
    if (!chk && b != hide) {
      resultArray.push(b);
    }
    if (resultArray.length == razmer - 1) {
      check = false;
    }
  }
  return resultArray;
}


function printNumbers(sample, speed) {
  let current = 0;
  let end = sample.length - 1;

  let timerId = setInterval(function() {
    if (current == end) {
      clearInterval(timerId);
    }
    Out.innerHTML = sample[current];
    current++;
  }, speed);
}; 

function printCards(numbArray, speed){
  let current = 0;
  let end = numbArray.length - 1;

  let timerId = setInterval(function() {
    if (current == end) {
      clearInterval(timerId);
    }
    document.querySelector('#cardArea').className = "cardImg card-"+numbArray[current];
    current++;
  }, speed);
  
};


//++++++++++++++++++++++++++++++++++++++++++++++++++++++  
butGO.onclick = function() {
  butGO.disabled = true;
  let gRegime = get_cookie('gameRegime');
  let cardAmount = document.querySelector("#kolvoCisel").value;
  let inpArr = document.querySelectorAll("input[name=speedInp]");  
  let diffArr = document.querySelectorAll("input[name=difficulty]");
   
  for (let i = diffArr.length - 1; i >= 0; i--) {
    if (diffArr[i].checked) {
      var diffVal = diffArr[i].value;
    };
  };
  
  if (gRegime == 1) {cardAmount = diffVal; };

  let hi = getRandom(1, cardAmount);
  document.cookie = "valueID="+(hi*653248);
  let abc = randomShow(cardAmount, hi);

   for (let i=0; i<= inpArr.length-1; i++){
    if(inpArr[i].name == "speedInp" && inpArr[i].checked ){
      speed = Number(inpArr[i].value);
        //console.log(speed);
       }
    }
  if (gRegime == 0) {   
    printNumbers(abc, speed);
    
  }else if(gRegime == 1) {
    printCards(abc, speed);
  }; 
  
  console.log(abc);

  setTimeout(function(){
    Out.innerHTML = "";
    Out.className = "";
    butGO.disabled = false;
    answerBlock.hidden = false;
  }, (cardAmount * speed));
  
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
butAnswer.onclick = function(){
  let userAnsw = answer.value;
  let hi = get_cookie('valueID')/653248;
  if(userAnsw == hi){
    alert("Молодец! Ответ правильный");
    answer.value = '';
  }else{
    alert("Неверно ;(")
  }
  console.log("Ответ - "+userAnsw+" Загадано - "+hi);
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
for (let i = gameRegime.length - 1; i >= 0; i--) {
  // console.log(gameRegime[i].value);
  gameRegime[i].onchange = function(){
    console.log(this.value);
    if (this.value == 0) {
      document.cookie = "gameRegime="+0
      numbers.hidden = false;
      suits.hidden   = true;

    };

    if (this.value == 1) {
      document.cookie = "gameRegime="+1
      numbers.hidden = true;
      suits.hidden   = false;
    };

  };
};
