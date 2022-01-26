const cards = document.querySelectorAll(".card");
let flip_counter = document.getElementById("flip_counter");
let time_counter = document.getElementById("time_counter");

let cardOne, cardTwo;
let matchedCard = 0, totalFlip = 0;
let disabledDeck = false;
let timeCounter = 0;

function flipCard(e){		

	let clickedCard = e.target;
	if(clickedCard !== cardOne && !disabledDeck){		

		// Total Flip Counter
		totalFlip ++;
		flip_counter.innerHTML = "Flip: " + totalFlip;
		
		clickedCard.classList.add('flip');
		if(!cardOne){
			return cardOne = clickedCard;
		}	

		cardTwo = clickedCard;
		disabledDeck = true;

		let cardOneImg = cardOne.querySelector('img').src,
			cardTwoImg = cardTwo.querySelector('img').src;
		matchCards(cardOneImg, cardTwoImg);
	}
}

function matchCards(img1, img2){
	if(img1 === img2){
		matchedCard ++;		
		if(matchedCard == 8){
			setTimeout(() => {
				return shuffleCards();
			}, 1000);
		}
		cardOne.removeEventListener('click', flipCard);
		cardTwo.removeEventListener('click', flipCard);
		cardOne = cardTwo = "";
		return disabledDeck = false;
	}
	

	setTimeout(() => {
		cardOne.classList.add('shake');
		cardTwo.classList.add('shake');	
	}, 400);

	setTimeout(() => {
		cardOne.classList.remove('shake', 'flip');
		cardTwo.classList.remove('shake', 'flip');	
		cardOne = cardTwo = "";
		disabledDeck = false;
	}, 1200);
}

function shuffleCards(){
	matchedCard = 0;
	cardOne = cardTwo = "";
	disabledDeck = false;
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
	arr.sort(() => Math.random() > 0.5 ? 1 : -1);
	
	cards.forEach((card, index) => {
		card.classList.remove('flip');
		let imgTag = card.querySelector('img');
		imgTag.src = `img/${arr[index]}.png`;
		card.addEventListener('click', flipCard);
	});
	return true;
}

shuffleCards();

function restart(){	
	shuffleCards();
	totalFlip = 0;
}

cards.forEach(card => {
	card.classList.remove('flip');
	card.addEventListener('click', flipCard);
});

while(!shuffleCards()){
	timeCounter ++;
	time_counter.innerHTML = "Time: " + timeCounter;
}