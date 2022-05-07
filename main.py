from os import stat

from sympy import true
from data import stateData
import random

initState = "1111"
roundStateList = []
factor = 0.8

def playGame():
    state = initState
    roundStateList.append(state)

    while state[:2] != "00":
        state = random.choice(list(stateData[state].items()))[0]
        roundStateList.append(state)
    
def feedBack():
    val = 1
    isWin = true
    for a in range(0, len(roundStateList)-1):
        if isWin:
            stateData[roundStateList[a+1]][roundStateList[a]] += val 
        else:
            stateData[roundStateList[a+1]][roundStateList[a]] -= val 

        val *= 0.8
        isWin = not isWin
        


if __name__ == '__main__':
    roundStateList = []

    print('---------playing---------')
    playGame()
    print(roundStateList)

    roundStateList.reverse()
    print('---------feedbacking---------')
    feedBack()
    print(stateData)