import React from 'react';
import styles from './game.css';
const Others = (props)=>{
    return props.others.map((player)=>{
	    return (
		<div key={player.id} >
		  <img className={styles.othersimage}
		       src={`/images/players/${player.image}`}
		       alt={player.name}
		       />
		</div>
	    );
    });
};

export default Others;
