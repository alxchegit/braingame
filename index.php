<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Игра память тренировка</title>
		 
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	<link href="css/style.css" rel="stylesheet">
  </head>
  <body>
    <h1 class="text-center">Тренажер памяти и внимательности</h1>
    <hr>
    <div class="container">
      <div class="row" style="height: 250px;">
        <div class="col-md-5 settings_block">
          <form action="">
              <h2 class="text-center">Настройки</h2>
               <div class="row">
                <div class="col-md-6">
                  <input type="radio" id="game0" name="gameRegime" value="0" checked><label for="game0">Числа</label>
                  <input type="radio" id="game1" name="gameRegime" value="1" ><label for="game1">Игральные карты </label>
                </div>

                <div id="suits" class="col-md-6 bg_color" style="display:none;"> 
                  <p>Сложность</p>
                      <input type="radio" name="difficulty" value="13" id="oneRow" checked>Одна масть <br>
                      <input type="radio" name="difficulty" value="26" id="twoRow">Две масти <br>
                      <input type="radio" name="difficulty" value="39" id="threeRow">Три масти <br>
                      <input type="radio" name="difficulty" value="52" id="fourRow">Четыре масти <br>
                </div>
                <div id="numbers" class="col-md-6 bg_color">
                  <p>Число элементов</p>
                    <input type="number" min="1" max="100" step="1" id="kolvoCisel" value="10">
                  <p>Скорость</p>
                    <input type="radio" name="speedInp" value="1000" checked>1x<br>
                    <input type="radio" name="speedInp" value="2000">2x<br>
                    <input type="radio" name="speedInp" value="3000">3x
                </div>
              </div>
           </form>
        </div>
        <div class="col-md-7 text-center">
          <button class="button">Вперед!</button>
          <div id="cardArea" ></div>
        </div>

      </div>

      <div class="row">
        <div id="answerBlock">
          <p>Введите ответ</p> 
          <input type="text" name="" id="answer">
          <br>
          <button class="ansBut">Проверить</button>
        </div>
      </div>
    </div>
    <!-- jQuery (necessary for Bootstrap JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <!-- <script src="js/script.js"></script> -->
    <script src="js/script.js"></script>
    
  </body>
</html>