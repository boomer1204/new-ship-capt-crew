jQuery(function($){
    'use strict';
    var Game = {
        init: function(){
            this.dice1 = this.create(1);
            this.dice2 = this.create(2);
            this.dice3 = this.create(3);
            this.dice4 = this.create(4);
            this.dice5 = this.create(5);
            this.shipExist = false;
            this.captExist = false;
            this.crewExist = false;
            this.diceArray = [dice1, dice2, dice3, dice4, dice5];
            this.cargo = 0;
            this.numOfRolls = 0;
            this.canHaveCargo = false;
            document.getElementById("dice1").classList.remove('glowing');
            document.getElementById("dice2").classList.remove('glowing');
            document.getElementById("dice3").classList.remove('glowing');
            document.getElementById("dice4").classList.remove('glowing');
            document.getElementById("dice5").classList.remove('glowing');
            this.bindEvents();
        },
        bindEvents: function(){
            $('#rollButton').on('click', this.rollDice.bind(this));
            $('#cargo').on('click', this.getCargo.bind(this));
        },
        create: function(id){
            this.id = id;
            this.value = 1;
            this.isSelected = false;
            this.diceImageUrl = 'img/dice/dice1.png';
        },
        getRollableDiceList: function(){
            this.tempDiceList = [];
            for(var i = 0; i < this.diceArray.length; i++){
                if(!this.diceArray[i].isSelected){
                    this.tempDiceList.push(this.diceArray[i]);
                }
            }
            return this.tempDiceList;
        },
        getNonSelectedDice: function(){
            var nonSelectedDice = this.checkForShipCaptCrew();
            var moreDice = [];
            for (var i = 0; i < nonSelectedDice.length; i++){
                if (!nonSelectedDice[i].isSelected){
                    moreDice.push(nonSelectedDice[i]);
                }
            }
            return moreDice;
        },
        rollRandomDice: function(){
            var newRollableList = this.getRollableDiceList();
            for (var i = 0; i < newRollableList.length; i++){
                newRollableList[i].value = Math.floor(Math.random() * (6 - 1 + 1) + 1);
            }
            return newRollableList;
        },
        orderDice: function(){
            var diceToOrder = this.rollRandomDice();
            diceToOrder.sort(function(a, b){
                return b.value - a.value;
            });
            return diceToOrder;
        },
        checkForShipCaptCrew: function(){
            var checkDiceForSCC = this.orderDice();
            for (var i = 0; i < checkDiceForSCC.length; i++){
                this.diceNow = checkDiceForSCC[i];
                if (!this.shipExist){
                    if (this.diceNow.value == 6){
                        this.shipExist = true;
                        this.diceNow.isSelected = true;
                    }
                }
                if (this.shipExist && !this.captExist){
                    if (this.diceNow.value == 5){
                        this.captExist = true;
                        this.diceNow.isSelected = true;
                    }
                }
                if(this.shipExist && this.captExist && !this.crewExist){
                    if (this.diceNow.value == 4){
                        this.crewExist = true;
                        this.diceNow.isSelected = true;
                        this.canHaveCargo = true;
                    }
                }
            }
            return checkDiceForSCC;
        },
        addGlow: function(){
            var checkForGlow = this.checkForShipCaptCrew();
            for (var i = 0; i < checkForGlow.length; i++){
                var checkDiceForGlow = checkForGlow[i];
                if (checkDiceForGlow.isSelected){
                    checkDiceForGlow.classList.add('glowing');
                }
            }
            return checkForGlow;
        },
        updateDiceImage: function(){
            for (var i = 0; i < this.diceArray.length; i++){
                var currentDice = this.diceArray[i];
                var diceImageUrl = "http://boomersplayground.com/img/dice/dice" + currentDice.value + ".png";
                document.getElementById(currentDice.id).style.backgroundImage = "url('" + diceImageUrl + "')";
            }
        },
        getCargo: function(){
            var cargoDice = this.addGlow();
            console.log(cargoDice);
        },
        rollDice: function(){
            if (this.numOfRolls < 3){
                this.addGlow();
                this.updateDiceImage();
                this.numOfRolls++;
            }
        }
    };
    Game.init();
});