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
		console.log('collect')
		setSelHand(hand);
		setSelFingerCount(fingers[hand]);
	}

	const transfer = (hand) => {
		console.log('transfer')
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
		for(let a=0; a<=total/2; a++){
			console.log(a, total-a);
		}
	}

	const clicked = (hand) => {
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

	useEffect(() => {
		state2fingers();
		if(turn == 'c'){
			playComputerTurn();
		}
		if(state.substring(0,2) == '00' || state.substring(2,4) == '00'){
			alert('Completed');
		}
	}, [state, selHand]);

	return (
		<View style={containers.component}>
			<View style={[containers.hands, containers.topHand]}>
				<TouchableOpacity
					style={(selHand == 0)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={(turn == 'h')? ()=> transfer(0): ()=> console.log('invalid press on 1')}
					disabled={(fingers[0] == 0)? true: false}
				>
					<Text style={hands.fingers}>{fingers[0]}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={(selHand == 1)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={(turn == 'h')? ()=> transfer(1): ()=> console.log('invalid press on 2')}
					disabled={(fingers[0] == 0)? true: false}
				>
					<Text style={hands.fingers}>{fingers[1]}</Text>
				</TouchableOpacity>
			</View>
			
			<View style={[containers.hands, containers.bottomHand]}>
				<TouchableOpacity
					style={(selHand == 2)? [hands.hand, hands.handSelected]: hands.hand}
					// onPress={(turn == 'h' && selFingerCount == 0)? ()=> collect(2): (selHand != 2)? ()=>distribute(): ()=> console.log('invalid press on 2')}
					onPress={()=> clicked(2)}
					disabled={(fingers[0] == 0)? true: false}
				>
					<Text style={hands.fingers}>{fingers[2]}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={(selHand == 3)? [hands.hand, hands.handSelected]: hands.hand}
					// onPress={(turn == 'h' && selFingerCount == 0)? ()=> collect(3): (selHand != 3)? ()=>distribute(): ()=> console.log('invalid press on 3')}
					onPress={()=> clicked(3)}
					disabled={(fingers[0] == 0)? true: false}
				>
					<Text style={hands.fingers}>{fingers[3]}</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity 
				onPress={()=> resetRound()}
			>
				<Text>Clear Selection</Text>
			</TouchableOpacity>

			{/* {SHOW DISTRIBUTE POSSIBLITY HERE} */}
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
		flex: 1,
		flexDirection: 'row',
		margin: 50,
	},
	topHand: {
		alignItems: 'flex-end'
	},
	bottomHand: {
		alignItems: 'flex-start'
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
	fingers: {
		fontSize: buttonSize/5,
	},
	handSelected: {
		borderColor: 'black',
		borderWidth: 5,
	}
});


