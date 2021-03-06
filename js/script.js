$(function(){

  var answer = $("#answer");
  var but_go = $(".button");
  var out = $("#cardArea");
  var but_answer = $(".ansBut");
  var answer_block = $("#answerBlock");
  var $game_regime = $("input[name=gameRegime]")
  var suits = $('#suits');
  var numbers = $('#numbers');
  var $pick_block = $('#pick_block');

  function get_cookie (cookie_name){
	 var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' ); 
	 if ( results )
		return ( unescape ( results[2] ) );
	 else
		return null;
  }

  function getRandom(max) {
	 return Math.floor(Math.random() * (max - 1 + 1)) + 1;
  }

  function randomShow(razmer, hide){
	 let resultArray = [];
	 let b;       
	 do {
		b = getRandom(razmer);
		if (b != hide && !resultArray.includes(b)) {
		resultArray.push(b);
		}
	 } while (resultArray.length < razmer - 1);
	 return resultArray;
  }

  function showInOut(numArray, speed, game) {
	 let current = 0;
	 let end = numArray.length - 1;
	 
	 if(+game){
		out.addClass("cardImg");      
	 } else {
		out.addClass("numbers_show");
	 }
	 let timerId = setInterval(function (){
		if (current == end) {
		  clearInterval(timerId);
		  setTimeout(function(){
			 out.removeClass("cardImg card-"+numArray[end]);
			 out.html("");
		  }, speed);
		  
		}
		if (+game) {
		  out.removeClass("card-" + numArray[current-1]);
		  out.addClass("card-"+numArray[current]);
		} else {
		  out.html(numArray[current]);        
		}
		
		current++;
	 }, speed);
  }
 
	function showAnswerCards(maximum, game){
		let i = 1;
		let timerid = setTimeout(function tick(){
		  	if(i>maximum){
				clearInterval(timerid);
		  	} else {
		  		if (+game) { // игральные карты
		  			let $context = $pick_block.append("<div class=\"answer_card card-"+i+"\" data-answer-id="+i+"></div>").find(".card-"+i);
						$context.css("display","none");
				  	let bgpos = $context.css("background-position").split(" ");
					let x_bgpos = +bgpos[0].split("px")[0];
			  		let y_bgpos = +bgpos[1].split("px")[0];
			  		let new_bgpos = x_bgpos / 2+"px ";
						new_bgpos += y_bgpos / 2+"px";			
						$context.css("background-position", new_bgpos);
						$context.addClass("cardImg");
						$context.css("display","block");
				
		  		} else {// числа
		  			let $context = $pick_block.append("<div class=\"answer_card numbers_show\" id=\"num-"+i+"\" data-answer-id="+i+">"+i+"</div>").find("#num-"+i);
						$context.css("display","none");
						$context.css("fontSize","2em");
						$context.css("display","toggle");
		  		}
		  		i++;
				timerid = setTimeout(tick, 100);				
		  }
		}, 100);
	}

/*
*
* Game regime change
*
*/

  $game_regime.change(function(){
	 let game, anim_speed = 400;
	 $(this).each(function(indx, elem){
		if($(this).prop("checked")){
		  game = $(this).attr("value");
		}   
	 })
	 if(+game) {    
		numbers.animate({
		  opacity:"toggle"
		},anim_speed, "linear", function(){
		  $(this).css("display","none");
		  suits.css({
			 "display":"block",
			 "opacity":"0"
		  });
		  suits.animate({
			 opacity:"1"
		  },anim_speed, "linear")
		}) 
	 } else {
		suits.animate({
		  opacity:"toggle"
		},anim_speed, "linear", function(){
		  $(this).css("display","none");
		  numbers.css({
			 "display":"block",
			 "opacity":"0"
		  });
		  numbers.animate({
			 opacity:"1"
		  },anim_speed,"linear")
		})   
	 }
	  
  });


/*
*
* Button GO!
*
*/
  but_go.click(function(e){

	 e.preventDefault();
	 
	 let game, input_speed, input_difficulty;

	 $game_regime.each(function (indx, elem){
		if($(this).prop("checked")){
		  game = +$(this).attr("value");
		}
	 });

	 let numbers_amount = $("#kolvoCisel").val();
	 
	 $("input[name=speedInp]").each(function(){
		if($(this).prop("checked")){
		  input_speed = $(this).attr('value');
		}
	 });
	 
	 $("input[name=difficulty]").each(function(){
		if($(this).prop("checked")){
		  input_difficulty = $(this).attr("value");
		}
	 });

	 let max_num = game ? input_difficulty :  numbers_amount;
	 let hide = getRandom(max_num);
	 document.cookie = "hiden_number=" + hide;
	 let numArray = randomShow(max_num, hide);
	 console.log("array - " + numArray + "; hide-" + hide);
	 let anim_speed = 500;
	 $(this).animate({
		opacity:"0"
	 },anim_speed, "linear", function(){
		$(this).css("display", "none");
		out.css("display","inline-block")
			 .animate({
				opacity:"1"
			 },anim_speed,"linear", function(){
				showInOut(numArray, input_speed, game);   
				setTimeout(function(){
				  out.animate({
					 opacity:"0"
				  },anim_speed, "linear", function(){
					 out.css("display", "none");
					 showAnswerCards(max_num, game);
					 but_go.css("display","inline-block")
						.animate({
						  opacity:"1"
						},anim_speed,"linear")

				  })                    
				}, (max_num * input_speed));

			 })
	 })     
  });

/*
*
* Button Answer
*
*/
	but_answer.click(function(){
		let userAnsw = answer.val();
		let hi = get_cookie("hiden_number");
		if(userAnsw == hi){
			alert("Молодец! Ответ правильный");
			answer.val("");
		}else{
			alert("Неверно ;(")
		}
		console.log("Ответ - "+userAnsw+" Загадано - "+hi);
	});

/*
*
* Pick Answer
*
*/
	$pick_block.on("click",".answer_card", function(){
		let userAnsw = $(this).attr("data-answer-id");
		let hi = get_cookie("hiden_number");
		if(userAnsw == hi){
			$(this).addClass("correct_answer");
			alert("Молодец! Ответ правильный");
			answer.val("");
			$pick_block.html("");
		}else{
			$(this).addClass("incorrect_answer");
			//alert("Неверно ;(")
		}
		console.log("Ответ - "+userAnsw+" Загадано - "+hi);
	})

	//showAnswerCards(15,0);
//////////////////////////////////
});  