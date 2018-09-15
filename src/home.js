import React from 'react';
import styles from './home.css';
import Game from './game';
const Home = (props) => {
    const {players,selectPlayer,selected,newGame,me} = props;
    const selection = ()=>{
	return (
	<div>
	  {players.filter( (player)=>{return player.selected === false })

	      .map((player,i)=>{ return <img className={styles.playerimage}
						 onClick={()=>selectPlayer(i)}
	                         key={player.id}
				 alt={player.name}
	                         src={`/images/players/${player.image}`}/>;})}
	</div>
	    
	);
    };

    const game= ()=>{
	return (
	    <Game me={me} newGame={newGame} />
	);
    };

    return (
	<div>
	  <div onClick={newGame}>NEW GAME</div>
	  { selected ? game() : selection() }
	</div>
    );
};

export default Home;
