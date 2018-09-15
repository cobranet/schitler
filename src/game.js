import React,{Component} from 'react';
import SockJsClient from 'react-stomp';
import {URL} from './config';
import Others from './others';
import styles from './game.css';
class Game extends Component {

    
    state= {
	me: this.props.me,
	others: []
    }

    connect(){
	console.log("CONNECT");
    }
    disconnect(){
	console.log("DISCONNECT");
    }
    
    onMessage=(msg)=>{
	
	const payload = JSON.parse(msg.payload);
	console.log(payload);
	console.log(msg.type);
	switch(msg.type){
	case('NEW_GAME'): {
	    this.props.newGame();
	    break;
	}
	case('SELECTED_PLAYERS'):{
	    this.setState({others: payload.others});
	    break;
	}
	default:
	    alert('default');
	}
	
    }

    
    render(){
	const {me} = this.state;
	return (
	    <div>
	    <SockJsClient url={`${URL}/api`}
    			  topics={['/topic/' + this.state.me.id , '/topic/loby' ] }
    			  onMessage={(msg) => { this.onMessage(msg); }}
    	                  onConnect={()=> { this.connect();} }
    		          onDisconnect={ ()=>{ this.disconnect();}}
    		          ref={ (client) => { this.clientRef = client }}
 
    	      />
	      <div className={styles.gamemain}>
		<img alt={me.name}
		     className={styles.myimage}
		     src={`/images/players/${me.image}`}/>
	      </div>
	      <Others others={this.state.others} />
	    </div>
	);
    }
    
}

export default Game;
