import React, { Component, useState } from 'react';
import Card from "@/classes/Card.jsx";
import Player from "@/classes/Player.jsx";;

import PropTypes from 'prop-types';

class Game{

    static gameStart(){
        var cardsDeck = [];
        // appends the array of each card into the deck
        cardsDeck.push(...this.generateCards("green"));
        cardsDeck.push(...this.generateCards("blue"));
        cardsDeck.push(...this.generateCards("yellow"));
        cardsDeck.push(...this.generateCards("red"));
        cardsDeck.push(...this.generateCards("blue"));
        return cardsDeck;
    }

    
static generateCards(colour){ 
    var arrayOfCards = [];

    // Determine the path to the sprite based on the colour
    var pathToSprite;
    switch (colour) {
        case 'green':
            pathToSprite = '/green';
            break;
        case 'blue':
            pathToSprite = '/blue';
            break;
        case 'red':
            pathToSprite = '/red';
            break;
        case 'yellow':
            pathToSprite = '/yellow';
            break;
        default:
            pathToSprite = ''; // Set a default value or handle invalid colours
    }

    // Generate 19 cards with random values
    for (var i = 0; i < 19; i++){
        var value = Math.floor(Math.random()* 9) + 1;
        var newCard = new Card("Normal", colour, value, 'sprites' + pathToSprite + "/" + value);
        arrayOfCards.push(newCard);
    }

return arrayOfCards;
}

    static generateRandomNumber(){

        switch (colour){
            // To determine how to select the correct sprite
                        case 'green':
                            return '/green';
                        
                        case 'blue':
                            return '/blue';
            
                        case 'red':
                            return '/red';
            
                        case 'yellow':
                            return '/yellow';
                    }
    }

    static generateSpecialCards(name){
            newCard= this.Card;
            newCard.colour = 
            newCard.imgSrc = " / " + newCard.colour + "/" + name;
            return newCard;
    }
    

    static isCardSelectedValid(cardOnDeck,cardToBePlaced){
        var valid = false;
        if(cardOnDeck.colour === cardToBePlaced.colour){
            valid = true;
        }

        if (cardOnDeck.value === cardToBePlaced.value){
            valid = true;
        }
        return valid;
    }
    

   static initPlayerDeck(cardOnDeck){
        let mockDeck = [...cardOnDeck]; // duplicate card deck to modify
        var playerDeck = [];
        for(let i = 0; i < 7; i++){
            var randomIndex = Math.floor(Math.random()* mockDeck.length);
            // let randomCard = mockDeck.splice(randomIndex,1)[0];

            playerDeck.push(mockDeck[randomIndex]);

            // remove card from the card deck
        }
        return playerDeck;
    }

    removeAt(arr,card){
        for(let i = 0; i < arr.length; i++){
            if(card.getValue() == arr[i].getValue()){
                if(card.getColour() == arr[i].getColour){

                }

            }
    }
}

}


Game.propTypes = { 
    // specifies thatr cardOnDeck and CardToBePlace need to be of type CARD
    cardOnDeck: PropTypes.instanceOf(Card).isRequired,
    cardToBePlaced: PropTypes.instanceOf(Card).isRequired,
    initPlayerDeck: PropTypes.instanceOf(Card).isRequired
};

export default Game;