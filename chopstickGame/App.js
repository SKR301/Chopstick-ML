import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
	const [state, setState] = useState('1111');
	const [fingers, setFingers] = useState([1,1,1,1]);
	const [turn, setTurn] = useState('c');
	const [selHand, setSelHand] = useState(0);
	const [selFingerCount, setSelFingerCount] = useState(0);

	const state2fingers = () => {
		let stateCharArray = state.split('');
		let stateIntArray = stateCharArray.map((ch) => parseInt(ch));
		setFingers(stateIntArray);

		console.log(fingers);
	}

	useEffect(() => {
		state2fingers();
	}, [state]);

	return (
		<View style={containers.component}>
			<View style={[containers.hands, containers.topHand]}>
				<TouchableOpacity
					style={hands.hand}
				>
					<Text style={hands.fingers}>{fingers[0]}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={hands.hand}
				>
					<Text style={hands.fingers}>{fingers[1]}</Text>
				</TouchableOpacity>
			</View>
			
			<View style={[containers.hands, containers.bottomHand]}>
				<TouchableOpacity
					style={hands.hand}
				>
					<Text style={hands.fingers}>{fingers[2]}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={hands.hand}
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
		borderColor: 'black',
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 50,
	},
	fingers: {
		fontSize: buttonSize/5,
	}
});


