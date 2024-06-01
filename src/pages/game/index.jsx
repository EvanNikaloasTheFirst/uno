import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/gameboard.module.css";
import mainStyles from "@/styles/Home.module.css";
import Game from "@/classes/Game.jsx";
import Player from "@/classes/Player.jsx";
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback} from 'react';
import { appendMutableCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function Home() {
  var allPlayer = [];
  const [lobby, setLobby] = useState([]); // using useState ensures lobby is populated just once
  const [Me, setMe] = useState(new Map());
  const [PlayerOne, setPlayerOne] = useState(new Map());
  const [PlayerTwo, setPlayerTwo] = useState(new Map());
  const [PlayerThree, setPlayerThree] = useState(new Map());
  const [allPlayers, setAllPlayers] = useState([]);
  const [playersTurn, setPlayerTurn] = useState(null);
  const [count, setCount] = useState(0);
  const [deck, setDeck] = useState([]);
  var mockDeck = [];
  var cardsDeck = Game.gameStart();
  var MyPlayer = new Player("Evangelos", Me);


  const [storedAmount, setStoredAmount] = useState(null); // set state 

  const retrieveAmount = () => {
    try {
      var amt = parseInt(localStorage.getItem("amountOfPlayer"));
      setStoredAmount(localStorage.getItem("amountOfPlayer"));

      const tempLobby = [];
      switch(amt){
        case 1:
          tempLobby.push(Me);
          tempLobby.push(PlayerOne);
          break;  
        
        case 2:
          tempLobby.push(Me);
          tempLobby.push(PlayerOne);
          tempLobby.push(PlayerTwo);
          break;  

        case 3:
          tempLobby.push(Me);
          tempLobby.push(PlayerOne);
          tempLobby.push(PlayerTwo);
          tempLobby.push(PlayerThree);
          break;  

      }
      setLobby(tempLobby)

    } catch (e) {
      console.error('Failed to retrieve amount from localStorage', e);
    }
  };

  

  // sets up the card deck for each player
  useEffect(() => {
    retrieveAmount();
    setMe(Game.initPlayerDeck(cardsDeck)); // Set Me directly
    setPlayerOne(Game.initPlayerDeck(cardsDeck));
    setPlayerTwo(Game.initPlayerDeck(cardsDeck));
    setPlayerThree(Game.initPlayerDeck(cardsDeck));


  }, []);

  useEffect(() => {
    if (storedAmount !== null) {
      // Ai bots
      var ai1 =  new Player("Jerry", PlayerOne);
      var ai2 =  new Player("Johan", PlayerTwo);
      var ai3 =  new Player("Tracey", PlayerThree);
      let updatedAllPlayer = []; // Create a new array to hold the updated player list

      switch(lobby.length){
        case 1:
          allPlayer.push(MyPlayer);
          allPlayer.push(ai1);
          updatedAllPlayer[MyPlayer,ai1];
      break;

        case 2:
          allPlayer.push(MyPlayer);
          allPlayer.push(ai1);
          allPlayer.push(ai2);
          updatedAllPlayer[MyPlayer,ai1,ai2];
          break;
        
        case 3:
          allPlayer.push(MyPlayer);
      allPlayer.push(ai1);
      allPlayer.push(ai2);
      allPlayer.push(ai3);
      updatedAllPlayer[MyPlayer,ai1,ai2,ai3];
      break
      }
      setAllPlayers(updatedAllPlayer);
    }
  }, [storedAmount]);

  var playerTurns =  ["Me","PlayerOne","PlayerTwo"];

  const setPlayerGo = useCallback(() => {
    setCount((prevCount) => {
        const newCount = prevCount + 1;
        console.log(playersTurn + " < Turn " + newCount);
        return newCount > 2 ? 0 : newCount;
    });
}, [playersTurn]);

useEffect(() => {
  setPlayerTurn(playerTurns[count]);
}, [count, playerTurns]);

  const placeCard = (card) =>{
    var index = null;
    var card;
    // Looks for the card that has been selected & stores it in a variable
    for (let i = 0; i < Me.length; i++){
      if (card.value == Me[i].value && card.colour === Me[i].colour){
        index = i;
        card = Me[i];
        break;
      }
    }
    if (index !== null && card !== null) {

      // Log the card placed down
      console.log("Card placed down " + card.value + " : " + card.colour);

      // Create a new array without the matching card
      const newCards = [...Me.slice(0, index), ...Me.slice(index + 1)];

      // Update the state with the new array
      setMe(newCards); // updates (my) card array

      const newDeck = [...deck, card]; // get current array and adds the card just placed down into array
      setDeck(newDeck);

    }

  }


  const playAi = (arr,name) =>{
    var index = null;


    var cards = arr[0];
    // Looks for the card that has been selected & stores it in a variable
    for (let i = 0; i < arr.length; i++){
      if (cards.value == arr[i].value && cards.colour === arr[i].colour){
        index = i;
        cards = arr[i];
        break;
      }
    }
    if (index !== null && cards !== null) {

      // Log the card placed down
      console.log("Card placed down " + cards.value + " : " + cards.colour);

      // Create a new array without the matching card
      const newCards = [...arr.slice(0, index), ...arr.slice(index + 1)];

      // Update the state with the new array
      // updates (my) card array
      switch(name){
        case 'PlayerOne':
          setPlayerOne(newCards);
        break;

        case 'PlayerTwo':
          setPlayerTwo(newCards);
        break;

        case 'PlayerThree':
          setPlayerThree(newCards);
        break;

        default:
          console.log("null")
      }

      const newDeck = [...deck, cards]; // get current array and adds the card just placed down into array
      setDeck(newDeck);

      console.log("Ai played: " +newDeck[newDeck.length - 1].value +  newDeck[newDeck.length - 1].colour );
    }

  }


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${mainStyles.main}`}>
        <div className={styles.gameboard}>

<p>Deck</p>

{deck.length > 0 && (
            <img
              src={`/sprites/${deck[deck.length - 1].colour}/${deck[deck.length - 1].colour}-${deck[deck.length - 1].value}.png`}
              alt=""
              className={styles.unoCard}
            />
          )}


<div className={styles.playerGameBoard}>
{/* // get number of players from local storage */}
<div className={styles.gameboardHands}>
     <ul className={styles.playersHands}>

      {/* Player One -------------------------------*/}
        <li className={styles.player}>
        <div className={styles.playersCards}>
        {<p>{MyPlayer.getName()}</p>}
          <ul>
{/* Players Cards */}
{/* Loop over the arry of objects (uno array cards) */}
{[...Me.values()].map((item, index) => (
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard}  
              onClick={() => {
                
                if(playersTurn === "Me"){
                  if(Game.isCardSelectedValid(deck[deck.length-1],item,deck)){
                     setPlayerGo()
                  placeCard(item);
                  
                  }
                  else{
                    alert("Cant place that card")
                  }
                 
                }else{
                  console.log(playersTurn);

                  switch(playersTurn){
                    case "PlayerOne":
                      playAi(PlayerOne,"PlayerOne") 
                          setPlayerGo()
                    break;

                    case "PlayerTwo":
                      playAi(PlayerTwo,"PlayerTwo") 
                          setPlayerGo()
                    break;

                    case "PlayerThree":
                      playAi(PlayerThree,"PlayerThree") 
                      setPlayerGo()

                    break;

                    default:
                      console.log("Me")
                      setPlayerGo()
                  }
                }
                
              }}
            /> 
          </li>
        ))}

          </ul>
        </div>
        </li>
        {storedAmount >= 1 && (
        <li className={styles.playerTwo}>
        <div className={styles.playersCards}>
          <p>Player Two</p>
          <ul>
            <li>       
            {[...PlayerOne.values()].map((item, index) => (
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard} 

            

            /> 
          </li>
        ))}
                 </li>
          </ul>
        </div>
</li>)}

{storedAmount >= 2 && (
        <li className={styles.playerThree}>
        <div className={styles.playersCards}>
      
          <ul>
            <li>       
            {[...PlayerTwo.values()].map((item, index) => (
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard} 
            /> 
          </li>
        ))}
            <p>Player Four</p>
                 </li>
          </ul>
        </div>
</li>)}

{storedAmount >= 3 && (
        <li className={styles.playerFour}>
        <div className={styles.playersCards}>
          <p>Player Three</p>
          <ul>
            <li>       
            {[...PlayerThree.values()].map((item, index) => (
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard} 
            /> 
          </li>
        ))}
                 </li>
          </ul>
        </div>
</li>)} 
            </ul>
</div> 
        </div>    
        </div>
      </main>
    </>
  );
}