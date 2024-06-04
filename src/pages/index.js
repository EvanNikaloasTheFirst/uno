import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  try{
    // clear the local storage when homepage is loaded
  localStorage.removeItem('amountOfPlayer');
  }catch(e){
    // pass on
  }
  var selectedPlayers = (amount) =>{
    localStorage.setItem("amountOfPlayer" ,amount);
    console.log("Clicked " + amount)
  }
 var [showPlayersButton, setShowPlayerButton] = useState(false); // initially set variable to false. setShowPlayerButton used to update variable
  const sayHello = () => {
    showButton(); // shows the option for amount of players to use
  };

  

  var amountOfPlayer = [1,2,3];

  var showButton = () =>{
    setShowPlayerButton(prevState => !prevState);
  }

  return (

    
    <>
      <Head>
        <title>Uno by Evangelos</title>
        <meta name="description" content="Uno by Evangelos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/uno_logo.png" />
      </Head>
      <main className={`${styles.main}`}>
        <div className={styles.WelcomeBlock}>
        <div>
          <img src="/uno_logo.png" className={styles.unoLogo}/>
          
        </div>
        
        <button className={styles.startGame} onClick={sayHello}>Start Game</button>
        <div>
          
          <div className={styles.amountOfPlayers}>
          <p className={styles.amtPlayerTxt}>Select the amount of players</p>

          { showPlayersButton && (
              <ul>
                {amountOfPlayer.map(amount => (
                  <li key={amount}>
                    <a href="/game">
                    <button
          className={styles.startGame}
          //  onClick={() => selectedPlayers(amount)} ensures that the selectedPlayers function is only called when the button is actually clicked
          onClick={() => selectedPlayers(amount)}> 
                      {amount}
                    </button>
</a>
                  </li>
                  
                ))}
              </ul>
          )}

          </div>
          
        </div>
</div>

      </main>
    </>
  );
}
