from data import stateData
import random

initState = "1111"

nextState = random.choice(list(stateData[initState].items()))[0]

