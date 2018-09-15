import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import Home from './home';
import axios from 'axios';
import {URL} from './config';
class App extends Component {
    state={
	players:[],
	me: null,
	selected: false,
    };

    newGame=()=>{
	axios.get(`${URL}/players/newgame`)
	    .then((response)=>{
		this.setState({players:[],
			       me: null,
			       selected: false});
		this.refreshPlayers();
	    });
    };
    
    componentWillMount(){
	if(this.state.players.length < 1 ) {
	    axios.get(`${URL}/players`)
		.then((response)=>{
		    this.setState({players: response.data});
		});
	}
    };

     refreshPlayers=() =>{
	axios.get(`${URL}/players`)
	    .then((response)=>{
		this.setState({players: response.data});
	    });
     };
    
    selectPlayer=(i)=>{
	axios.get(`${URL}/players/select/${i}`)
	    .then((response)=>{
		const {payload} = response.data;
		this.refreshPlayers();
		if(payload !== "NONE" ){
		    
		    this.setState(
			{ me:  this.state.players[i]   ,
			  selected: true });
		}
	    });
    };
    
    render(){
	return (
	    <Layout>
	      <Home players={this.state.players}
		    selectPlayer={this.selectPlayer}
		    newGame={this.newGame}
		    me={this.state.me}
		    selected= {this.state.selected}
		    />
	    </Layout>
	);
    };
};

ReactDOM.render(<App />, document.getElementById('root'));

