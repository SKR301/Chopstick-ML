import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { stateData100 } from './assets/modelCollection';

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
			fingers[hand] += selFingerCount;
			fingers[hand] %= 5;
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

		// Need to sort but maintain order 
		let optimalState = optimalState01.split('').sort().reverse().join('') + optimalState23.split('').sort().reverse().join('');

		let nextState = sortDict(stateData100[optimalState])[0][0];
		let properState = nextState.substring(2,4)+nextState.substring(0,2);
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
		if(state.substring(0,2) == '00' || state.substring(2,4) == '00'){
			alert('Completed');
		}else{
			if(turn == 'c'){
				playComputerTurn();
			}
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

	return (
		<View style={containers.component}>
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
					disabled={(fingers[0] == 0)? true: false}
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
					disabled={(fingers[0] == 0)? true: false}
				>
					<Text style={text.fingers}>{fingers[2]}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={(selHand == 3)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={()=> clicked(3)}
					disabled={(fingers[0] == 0)? true: false}
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
	}
});


