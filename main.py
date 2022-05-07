from os import stat
from data import stateData
import random

initState = "1111"
roundStateList = []
factor = 0.8
gameIterations = 100000

def playGame():
    state = initState
    roundStateList.append(state)

    while state[:2] != "00":
        state = random.choice(list(stateData[state].items()))[0]
        roundStateList.append(state)
    
def feedBack():
    val = 1
    isWin = True
    for a in range(0, len(roundStateList)-1):
        if isWin:
            stateData[roundStateList[a+1]][roundStateList[a]] += val 
        else:
            stateData[roundStateList[a+1]][roundStateList[a]] -= val 

        val *= 0.8
        isWin = not isWin
        
def writeToFile():
    f = open('output','w')
    f.write(str(stateData))
    f.close()


if __name__ == '__main__':
    for i in range(gameIterations):
        print('Iteration: ', i,end='\r')

        roundStateList = []
        
        playGame()
        roundStateList.reverse()
        feedBack()

    writeToFile()
