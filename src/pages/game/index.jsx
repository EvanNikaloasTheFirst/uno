import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/gameboard.module.css";
import mainStyles from "@/styles/Home.module.css";
import Game from "@/classes/Game.jsx";
import Player from "@/classes/Player.jsx";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { appendMutableCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function Home() {
  var allPlayer = [];

  const [lobby, setLobby] = useState([]); // using useState ensures lobby is populated just once
  const [Me, setMe] = useState(new Map());
  const [PlayerOne, setPlayerOne] = useState(new Map());
  const [PlayerTwo, setPlayerTwo] = useState(new Map());
  const [PlayerThree, setPlayerThree] = useState(new Map());
  const [allPlayers, setAllPlayers] = useState([]);
  
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
    console.log("Lobby size: " + lobby.length)
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

      // for (let i = 0; i < lobby.length; i++) {
      //   console.log(allPlayer[i].getName() + " Length of cards: " +  allPlayer[i].getAllCards().length);
      // }
      console.log( Me.length);
      Me.forEach(value =>{
        console.log(value.name)
      })

    }
  }, [storedAmount]);

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
           

<div className={styles.playerGameBoard}>
{/* // get number of players from local storage */}
<div className={styles.gameboardHands}>
     <ul className={styles.playersHands}>
      {/* Player One -------------------------------*/}
        <li className={styles.player}>
        <div className={styles.playersCards}>
        {<p>Player One : {MyPlayer.getName()}</p>}

          <ul>
{/* Players Cards */}

{/* Loop over the arry of objects (uno array cards) */}
{[...Me.values()].map((item, index) => (
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard} 
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
            {[...PlayerThree.values()].map((item, index) => (
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard} 
            /> 
          </li>
        ))}
            <p>Player Three</p>
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