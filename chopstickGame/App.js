import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { stateData100 } from './assets/modelCollection';

export default function App() {
	const [state, setState] = useState('1111');
	const [fingers, setFingers] = useState([1,1,1,1]);
	const [turn, setTurn] = useState('h');
	const [selHand, setSelHand] = useState(-1);
	const [selFingerCount, setSelFingerCount] = useState(0);

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
		fingers[hand] += selFingerCount;
		fingers[hand] %= 5;
		setState(fingers.join(''));
		changeTurn();
	}

	useEffect(() => {
		console.log(stateData100);
		state2fingers();
		// playComputerTurn();
	}, [state, selHand]);

	return (
		<View style={containers.component}>
			<View style={[containers.hands, containers.topHand]}>
				<TouchableOpacity
					style={(selHand == 0)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={(turn == 'h')? ()=> transfer(0): ()=> console.log('!')}
				>
					<Text style={hands.fingers}>{fingers[0]}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={(selHand == 1)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={(turn == 'h')? ()=> transfer(1): ()=> console.log('@')}
				>
					<Text style={hands.fingers}>{fingers[1]}</Text>
				</TouchableOpacity>
			</View>
			
			<View style={[containers.hands, containers.bottomHand]}>
				<TouchableOpacity
					style={(selHand == 2)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={(turn == 'h')? ()=> collect(2): ()=>console.log('#')}
				>
					<Text style={hands.fingers}>{fingers[2]}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={(selHand == 3)? [hands.hand, hands.handSelected]: hands.hand}
					onPress={(turn == 'h')? ()=> collect(3): ()=>console.log('$')}
				>
					<Text style={hands.fingers}>{fingers[3]}</Text>
				</TouchableOpacity>
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


