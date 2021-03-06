"""
This module checks if the prepared model is robust or not and analyze it.
Also normalize it first.
Robust model: There is only one best solution from any given stage.
"""

from data import data

def checkRobustness(states):
    normalizedData = {}

    for key in states:
        value = states[key]
        factor = 1.0 / sum(value.values())
        for keyVal in value:
            value[keyVal] = value[keyVal] * factor
        
        sortedMoves = dict(sorted(value.items(), key=lambda item: item[1]))
        normalizedData[key] = sortedMoves
        
    # print(normalizedData)

    thresholds = [0.5, 0.75, 0.9]

    for threshold in thresholds:
        count = 0
        for key in normalizedData:
            bestMove = list(normalizedData[key].keys())[-1]
            if normalizedData[key][bestMove] > threshold:
                count += 1
            
        print(f'{threshold}\t{count/len(states)}')


if __name__ == '__main__':
    # print('\t100')
    checkRobustness(data)
    print()