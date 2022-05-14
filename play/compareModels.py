"""
This file will be used to compare 2 trained data models against each other to see how they differ.
Thesis: Difference between extreme models should be more
Observation:
- Models gain knowledge only after 10000 games
- Models with closer game played have more similarities
"""

# Add models to compare 
from modelCollection import stateData100 as sd100
from modelCollection import stateData1000 as sd1000
from modelCollection import stateData10000 as sd10000
from modelCollection import stateData100000 as sd100000
from modelCollection import stateData1000000 as sd1000000
from modelCollection import stateData10000000 as sd10000000

output100 = []
output1000 = []
output10000 = []
output100000 = []
output1000000 = []
output10000000 = []


for key in sd100.keys():
    possibleMoves = sd100[key]
    sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
    nextMove = list(sortedMoves.keys())[-1]
    output100.append(nextMove)

for key in sd1000.keys():
    possibleMoves = sd1000[key]
    sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
    nextMove = list(sortedMoves.keys())[-1]
    output1000.append(nextMove)

for key in sd10000.keys():
    possibleMoves = sd10000[key]
    sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
    nextMove = list(sortedMoves.keys())[-1]
    output10000.append(nextMove)

for key in sd100000.keys():
    possibleMoves = sd100000[key]
    sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
    nextMove = list(sortedMoves.keys())[-1]
    output100000.append(nextMove)

for key in sd1000000.keys():
    possibleMoves = sd1000000[key]
    sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
    nextMove = list(sortedMoves.keys())[-1]
    output1000000.append(nextMove)

for key in sd10000000.keys():
    possibleMoves = sd10000000[key]
    sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
    nextMove = list(sortedMoves.keys())[-1]
    output10000000.append(nextMove)

for a in range(196):
    print(f'{output100[a]},{output1000[a]},{output10000[a]},{output100000[a]},{output1000000[a]},{output10000000[a]}')