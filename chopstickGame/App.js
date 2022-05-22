import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
	const [compFingers, setCompFingers] = useState([1,1]);
	const [humanFingers, setHumanFingers] = useState([1,1]);
	const [turn, setTurn] = useState('c');
	const [currFingerCount, setCurrFingerCount] = useState(0);

	const changeTurn = () => {
		if(turn == 'c'){
			setTurn('h');
		} else {
			setTurn('c');
		}
	}

	const clicked = () => {
		console.log('selected');
	}

	return (
		<View style={styles.container}>
			<View style={styles.handContainer}>
				<TouchableOpacity style={styles.fingers} onPress={clicked}>
					<Text style={styles.fingerText}>{compFingers[0]}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.fingers} onPress={clicked}>
					<Text style={styles.fingerText}>{compFingers[1]}</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.handContainer}>
				<TouchableOpacity style={styles.fingers} onPress={clicked}>
					<Text style={styles.fingerText}>{humanFingers[0]}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.fingers} onPress={clicked}>
					<Text style={styles.fingerText}>{humanFingers[1]}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#444',
		justifyContent: 'center',
		alignItems: 'center',
	},
	handContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	fingers: {
		margin: 10,
		padding: 10,
		width: 250,
		height: 100,
		textAlign: 'center',
		justifyContent: 'center',
		backgroundColor: '#aaa'
	},
	fingerText: {
		fontSize: 20
	}
});


