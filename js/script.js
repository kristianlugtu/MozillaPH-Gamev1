var numCards = 12;
var cards = {};
var pairs = {};
var selected = -1;
var pairsFound = 0;
var moves = 0;
var status;
var snd = new Audio("sounds/1.mp3");
var snd2 = new Audio("sounds/2.mp3");
var snd3 = new Audio("sounds/3.mp3");

function setupitup(){
	createMenu();
	createStatus();
	createGameboard();
	assignCardPairs();
	
}

function createMenu(){
	menuDiv = document.getElementById("menu");
	dMenu = createDifficultyMenu();
	menuDiv.appendChild(dMenu);
	
	resetMenu = document.createElement("div");
	resetMenu.id = "resetmenu";
	resetMenu.setAttribute("class", "menu");
	resetMenu.innerHTML = "reset";
	resetMenu.addEventListener("click", reset, false);
	menuDiv.appendChild(resetMenu);
}

function createDifficultyMenu(){
	dMenu = document.createElement("div");
	dMenu.id = "dmenu";
	return dMenu;
}

function createStatus(){
	statusDiv = document.getElementById("status");
	movesLabel = document.createElement("div");
	movesLabel.id = "moveslabel";
	movesLabel.innerHTML = "Moves:";
	statusDiv.appendChild(movesLabel);
	
	movesValue = document.createElement("div");
	movesValue.id = "movesvalue";
	movesValue.innerHTML = "0";
	statusDiv.appendChild(movesValue);
	
	status = movesValue;
}

function createGameboard(){
	gameboardDiv = document.getElementById("gameboard");
	
	for(var i = 0; i < numCards; i++){
		card = document.createElement("div");
		card.id = "card" + i;
		card.setAttribute("class", "card");
		gameboardDiv.appendChild(card);
		card.addEventListener("click", flipCard, false);
		
		cardback = document.createElement("div");
		cardback.setAttribute("class", "card-back");
		card.appendChild(cardback);
		
		cardfront = document.createElement("div");
		cardfront.setAttribute("class", "card-front");
		card.appendChild(cardfront);
		
		cards[i] = card;
	}
}

function flipCard(){
	
	card = this;
	card.setAttribute("class", "card active pair" + pairs[this.id]);
	card.firstChild.setAttribute("class", "card-back-active");
	card.lastChild.setAttribute("class", "card-front-active");
	if(selected == -1){
		selected = this;
	}
	else if (selected == this){
		// Selected the same card. Do nothing.
		return;
	}
	else{
		if(pairs[this.id] == pairs[selected.id]){
			// match made
			selected.removeEventListener("click", flipCard, false);
			card.removeEventListener("click", flipCard, false);
			selected = -1;
			pairsFound++;
			snd2.play();

   		 	//var oAudio = snd2;
    		//oAudio.currentTime = 0;
			
		}
		else{
			snd3.play();
   			//var oAudioo = snd3;
    		//oAudioo.currentTime = 0;
			card1 = card;
			card2 = selected;
			selected = -1;
			setTimeout(function() {
				card1.setAttribute("class", "card pair" + pairs[card1.id]);
				card1.firstChild.setAttribute("class", "card-back");
				card1.lastChild.setAttribute("class", "card-front");
				card2.setAttribute("class", "card pair" + pairs[card2.id]);
				card2.firstChild.setAttribute("class", "card-back");
				card2.lastChild.setAttribute("class", "card-front");
			},1000);

			
		}
		moves++;
		status.innerHTML = moves;
		if(pairsFound == (numCards/2)){
			//var oAudio2 = snd;
    		//oAudio2.currentTime = 0;
			snd.play();	

			
			alert("You Won in " + moves + " moves!");
			reset();
		}
	}
}

function assignCardPairs(){

	var arr = []
	while(arr.length < 6){
  	var randomnumber=Math.ceil(Math.random()*10)
  	var found=false;
  		for(var i=0;i<arr.length;i++){
    		if(arr[i]==randomnumber){found=true;break}
  		}
  	if(!found)arr[arr.length]=randomnumber;
	}




	var numPairs = numCards / 2;
	var taken = new Array();
	for(var i = 0; i < numPairs; i++){
		var card1, card2;
		do{
			card1=Math.floor(Math.random()*numCards);
		}while(taken[card1] == true);
		taken[card1] = true;
		do{
			card2=Math.floor(Math.random()*numCards);
		}while(taken[card2] == true);
		taken[card2] = true;
		pairs["card"+card1] = arr[i];
		pairs["card"+card2] = arr[i];
	}
}

function reset(){
	pairs = {};
	selected = -1;
	pairsFound = 0;
	moves = 0;
	status.innerHTML = moves;
	resetGameboard();
	assignCardPairs();

}

function resetGameboard(){
	resetCard(0, pairs);
}

function resetCard(id, pairs){
	if((act = cards[id].getAttribute("class").indexOf("active")) > 0){
		//cards[id].setAttribute("class", "card pair" + pairs[cards[id].id]);
		cards[id].setAttribute("class", cards[id].getAttribute("class").substr(0, act) + cards[id].getAttribute("class").substr(act + 7, cards[id].getAttribute("class").length));
		cards[id].firstChild.setAttribute("class", "card-back");
		cards[id].lastChild.setAttribute("class", "card-front");
		setTimeout(function(){
			resetCard(id, pairs);
		}, 200);
	}
	else{
	cards[id].setAttribute("class", "card-reset");
	cards[id].addEventListener("click", flipCard, false);
	var card = cards[id];
	setTimeout(function() {
		card.setAttribute("class", "card");
		},2000);	
	if((id+1) < numCards){
		setTimeout(function(){
			resetCard(id+1, pairs);
		}, 200);
	}
	}
}


