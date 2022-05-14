"""
This file will be used to compare 2 trained data models against each other to see how they differ.
Thesis: Difference between extreme models should be more
Observation:
      
"""

# Add models to compare 
from modelCollection import stateData100 as sd100
from modelCollection import stateData1000 as sd1000
from modelCollection import stateData10000 as sd10000
from modelCollection import stateData100000 as sd100000
from modelCollection import stateData1000000 as sd1000000
from modelCollection import stateData10000000 as sd10000000

output100 = []

for key in sd100.keys():
    possibleMoves = sd100[key]
    sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
    nextMove = list(sortedMoves.keys())[-1]
    output100.append(nextMove)

print(output100)