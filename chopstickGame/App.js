import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions  } from 'react-native';
import { stateData100 } from './assets/modelCollection';
import { stateData10000 } from './assets/modelCollection';
import { stateData10000000 } from './assets/modelCollection';

export default function App() {
	const [state, setState] = useState('1111');
	const [fingers, setFingers] = useState([1,1,1,1]);
	const [turn, setTurn] = useState('h');
	const [selHand, setSelHand] = useState(-1);
	const [selFingerCount, setSelFingerCount] = useState(0);
	const [distributedStates, setDistributedStates] = useState([]);

	const resetRound = () => {
		setSelHand(-1);
		setSelFingerCount(0);
		setDistributedStates([]);
	}

	const state2fingers = () => {
		let stateCharArray = state.split('');
		let stateIntArray = stateCharArray.map((ch) => parseInt(ch));
		setFingers(stateIntArray);
	}
	
	const changeTurn = () => {
		(turn == 'h')? setTurn('c'): setTurn('h');
	}

	const collect = (hand) => {
		setSelHand(hand);
		setSelFingerCount(fingers[hand]);
	}

	const transfer = (hand) => {
		if(selFingerCount != 0){
			let newFinger = fingers;
			fingers[hand] += selFingerCount;
			fingers[hand] %= 5;
			setFingers(newFinger);
			setState(fingers.join(''));
			changeTurn();
			resetRound();
		}
	}

	const distribute = () => {
		let total = fingers[2] + fingers[3];
		let possibleDist = [];
		for(let a=0; a<=total/2; a++){
			if(total-a != 5 && a != 5){
				possibleDist.push([a, total-a]);
			}
		}

		possibleDist = possibleDist.filter((val)=> {
			return (val[0] != fingers[2] || val[1] != fingers[3])&&(val[1] != fingers[2] || val[0] != fingers[3]);
		})

		setDistributedStates(possibleDist);
	}

	const clicked = (hand) => {
		setDistributedStates([]);
		if(turn == 'h' && selFingerCount == 0 && selHand == -1){
			collect(hand);
		}
		if(turn == 'h' && selFingerCount != 0 && selHand != -1){
			distribute();
		}
	}

	const sortDict = (dict) => {
		let sorted = Object.keys(dict).map(function(key) {
			return [key, dict[key]];
		});
		  
		sorted.sort(function(first, second) {
			return second[1] - first[1];
		});

		return sorted;
	}

	const playComputerTurn = () => {
		let optimalState01 = state.substring(0,2);
		let optimalState23 = state.substring(2,4);
		let swap = [false, false];
		
		let temp1 = optimalState01.split('').sort().reverse().join('');
		let temp2 = optimalState23.split('').sort().reverse().join('');
		swap[0] = !(optimalState01[0] > optimalState01[1]);
		swap[1] = !(optimalState23[0] > optimalState23[1]);

		let optimalState = temp1 + temp2;

		let nextState = sortDict(stateData10000000[optimalState])[0][0];
		temp1 = (swap[0])? nextState.substring(2,4).split('').reverse().join(''): nextState.substring(2,4);
		temp2 = (swap[1])? nextState.substring(0,2).split('').reverse().join(''): nextState.substring(0,2);
		let properState = temp1 + temp2;

		setTimeout(()=>{
			setState(properState);
		},500); 
		changeTurn();
	}

	const clickDist = (val1, val2) => {
		setDistributedStates([]);
		fingers[2] = val1;
		fingers[3] = val2;

		setState(state.substring(0,2)+val1+val2);
		resetRound();
		changeTurn();
	}

	useEffect(() => {
		state2fingers();
		
		if(turn == 'c' && state.substring(0,2) != '00' && state.substring(2,4) != '00'){
			playComputerTurn();
		}

	}, [state, selHand, distributedStates]);

	const distributedRender = [];
	for (let distributedState of distributedStates) {
		distributedRender.push(
			<TouchableOpacity
				style={util.distButton}
				key={distributedState[0]}
				onPress={()=> clickDist(distributedState[0], distributedState[1])}
			>
				<Text style={text.distButton}>
					{distributedState[0]+''+distributedState[1]}
				</Text>
			</TouchableOpacity>
		);  
	}

	const gameOver = () => {
		if(state.substring(0,2) != '00' && state.substring(2,4) != '00'){
			return (
				<View style={containers.gameOver}>
					<Text style={text.gameOver}>GAME OVER</Text>
				</View>
			);
		}
	}

	return (
		<View style={containers.component}>
			{gameOver()}

			<View style={[containers.hands, containers.topHand]}>
				<TouchableOpacity
					style={(selHand == 0)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={(turn == 'h')? ()=> transfer(0): ()=> console.log('invalid press on 1')}
					disabled={(fingers[0] == 0)? true: false}
				>
				<Text style={text.fingers}>{fingers[0]}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={(selHand == 1)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={(turn == 'h')? ()=> transfer(1): ()=> console.log('invalid press on 2')}
					disabled={(fingers[1] == 0)? true: false}
				>
					<Text style={text.fingers}>{fingers[1]}</Text>
				</TouchableOpacity>
			</View>

		<TouchableOpacity 
			style={util.resetButton}
			onPress={()=> resetRound()}
		>
			<Text style={text.resetButton}>Clear Selection</Text>
		</TouchableOpacity>
			
			<View style={[containers.hands, containers.bottomHand]}>
				<TouchableOpacity
					style={(selHand == 2)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={()=> clicked(2)}
					disabled={(turn == 'c' || (turn == 'h' && selFingerCount == 0 && fingers[2] == 0))? true: false}
				>
					<Text style={text.fingers}>{fingers[2]}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={(selHand == 3)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={()=> clicked(3)}
					disabled={(turn == 'c' || (turn == 'h' && selFingerCount == 0 && fingers[3] == 0))? true: false}
				>
					<Text style={text.fingers}>{fingers[3]}</Text>
				</TouchableOpacity>
			</View>

			<View style={containers.distribute}>
				{distributedRender}
			</View>
		</View>
	);
}

const buttonSize = 200;

const containers = StyleSheet.create({
	component: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	hands: {
		flex: 4.5,
		flexDirection: 'row',
		margin: 50,
	},
	topHand: {
		alignItems: 'flex-end'
	},
	bottomHand: {
		alignItems: 'flex-start'
	},
	distribute: {
		flex: 1,
		flexDirection: 'row',
	},
	gameOver: {
		backgroundColor: '#333',
		width: Dimensions.get('window').width,
		alignItems: 'center'
	}
});

const hands = StyleSheet.create({
	hand: {
		height: buttonSize,
		width: buttonSize,
		borderRadius: buttonSize,
		backgroundColor: '#ddd',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 50,
	},
	handSelected: {
		borderColor: 'black',
		borderWidth: 5,
	}
});

const util = StyleSheet.create({
	resetButton: {
		padding: 20,
		borderRadius: 10,
		backgroundColor: '#555',
	},
	distButton: {
		borderColor: '#aaa',
		borderWidth: 2,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
	}
});

const text = StyleSheet.create({
	resetButton: {
		fontSize: 15,
		color: '#fff',
	},	
	fingers: {
		fontSize: buttonSize/5,
	},
	distButton: {
		fontSize: 30,
		paddingHorizontal: 50,
		paddingVertical: 30,
	},
	gameOver: {
		padding: 50,
		fontSize: 50,
		color: '#fff'
	}
});


