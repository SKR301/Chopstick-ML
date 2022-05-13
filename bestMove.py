from model import modelData
import time

if __name__ == '__main__':
    while True:
        state = input('Enter state: ')
        possibleMoves = modelData[state]
        sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
        nextMove = list(sortedMoves.keys())[-1]
        print(f'Next best move from {state} is {nextMove}')
        time.sleep(1)
