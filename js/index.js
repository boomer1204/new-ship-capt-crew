var dice1 = new dice(1);
var dice2 = new dice(2);
var dice3 = new dice(3);
var dice4 = new dice(4);
var dice5 = new dice(5);
var shipExist = false;
var captExist = false;
var crewExist = false;
var diceArray = [dice1, dice2, dice3, dice4, dice5];
var rollButton = document.getElementById('roll_button');
var cargo = 0;
var numOfRolls = 0;
var cargoButton = document.getElementById('cargo');
var canHaveCargo = false;
var playerScore = document.getElementById('firstPlayerScore');
var startButton = document.getElementById('restart');
var p1 = document.getElementById('p1');
cargoButton.addEventListener('click', getCargo);
startButton.addEventListener('click', restart);

function restart(){
  dice1 = new dice(1);
  dice2 = new dice(2);
  dice3 = new dice(3);
  dice4 = new dice(4);
  dice5 = new dice(5);
  shipExist = false;
  captExist = false;
  crewExist = false;
  diceArray = [dice1, dice2, dice3, dice4, dice5];
  cargo = 0;
  numOfRolls = 0;
  canHaveCargo = false;
  addGlow();
  updateDiceImageUrl();
  document.getElementById("dice1").classList.remove('glowing');
  document.getElementById("dice2").classList.remove('glowing');
  document.getElementById("dice3").classList.remove('glowing');
  document.getElementById("dice4").classList.remove('glowing');
  document.getElementById("dice5").classList.remove('glowing');
}

//dice object
function dice(id){
    this.id = id;
    this.currentRoll = 1;
    this.previousRoll = 1;
    this.isSelected = false;
    this.diceImageUrl = "img/dice/dice1.png";
    this.roll = function(){
        this.previousRoll = this.currentRoll;
        this.currentRoll = getRandomRoll(1, 6);
    }
}

//returns an array of all dice that are not currently selected so they can be rolled.
function getRollableDiceList(){
    var tempDiceList = [];
    for(var i = 0; i < diceArray.length; i++){
        if(!diceArray[i].isSelected){
            tempDiceList.push(diceArray[i]);
        }
    }
    return tempDiceList;
}

// gets a random number between min and max (including min and max)
function getRandomRoll(min,max){
    return Math.floor(Math.random() * (max-min + 1) + min);
}

// calls the roll function on each dice
function rollDice(rollableDiceList){
    for(var i = 0; i < rollableDiceList.length; i++){
        rollableDiceList[i].roll();
    }
}

// updates each dice with the new url for the image that corresponds to what their current roll is
function updateDiceImageUrl(){
    for(var i = 0; i < diceArray.length; i++){
        var currentDice = diceArray[i];

        currentDice.diceImageUrl = "http://boomersplayground.com/img/dice/dice" + currentDice.currentRoll + ".png";

        //update div image with img that cooresponds to their current roll
        updateDiceDivImage(currentDice);
    }
}

//Displays the image that matches the roll on each dice
function updateDiceDivImage(currentDice) {
    document.getElementById("dice"+currentDice.id).style.backgroundImage = "url('" + currentDice.diceImageUrl +"')";
}

// returns an array of all
function getNonSelectedDice(){
    var tempArray = [];
    for(var i = 0; i < diceArray.length; i++){
        if(!diceArray[i].isSelected){
            tempArray.push(diceArray[i]);
        }
      tempArray.sort(function(a, b){
        return b.currentRoll - a.currentRoll;
      });
    }
    return tempArray;
}

function getSelectedDice(){
  var selectedDice = [];
  for(var i = 0; i < diceArray.length; i++){
    if(diceArray[i].isSelected){
      selectedDice.push(diceArray[i]);
    }
  }
  return selectedDice;
}

//checks each dice for ship captain and crew. Auto select the first 6, 5 , 4.
function checkForShipCaptCrew(){
    //array of dice that are not marked selected
    var nonSelectedDice = getNonSelectedDice();

    for(var i = 0; i < nonSelectedDice.length; i++){
        //temp variable that represents the current dice in the list
      currentDice = nonSelectedDice[i];

      if (!shipExist) {
          if (currentDice.currentRoll == 6) {
              shipExist = true;
              currentDice.isSelected = true;
          }
      }
      if (shipExist && !captExist) {
        if (currentDice.currentRoll == 5) {
          captExist = true;
          currentDice.isSelected = true;
        }
      }
      if (shipExist && captExist && !crewExist) {
        if (currentDice.currentRoll == 4) {
            crewExist = true;
            currentDice.isSelected = true;
            canHaveCargo = true;
        }
      }
    }
}

function addGlow(){
  var selectedDice = getSelectedDice();

  for (var i = 0; i < selectedDice.length; i++){
    var addGlowDice = selectedDice[i];
    var element = document.getElementById('dice' + addGlowDice.id);

    element.className = element.className + " glowing";
  }
}

function getCargo(){
  var cargo = 0;
  var moreDice = getNonSelectedDice();
  if (canHaveCargo){
    for(var i=0; i < moreDice.length; i++){
      cargo += moreDice[i].currentRoll;
    }
    var newScore = playerScore.innerHTML = 'You have got ' + cargo + ' in ' + numOfRolls + ' rolls!';
    p1.innerHTML = newScore;
    numOfRolls = 3;
  } else {
      alert("You haven't round up the Ship, Captain and Crew yet!");
  }
}

rollButton.addEventListener('click', function(){
        //generate rollable dice list


    if (numOfRolls < 3) {

        var rollableDiceList = getRollableDiceList();

        //roll each dice
        rollDice(rollableDiceList);

        //update dice images
        updateDiceImageUrl();

        getNonSelectedDice();

        // //auto select first 6, 5, 4 (in that order)
        checkForShipCaptCrew();

        addGlow();
        // //adds a red glow to each dice that is selected
        numOfRolls++;
    }
});