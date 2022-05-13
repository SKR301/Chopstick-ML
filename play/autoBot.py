"""
This file will be used to fight two trained data models against each other and generate win percentage for both to see how much better one is. MAY THE BEST MODEL WIN.
Thesis: Model with more game play should win more
Observation: 
"""

from model import stateData100 as sd100
from model import stateData1000 as sd1000

i = 1
state = '1111'
totalGames = 100
sd100Won = 0
sd1000Won = 0

# loop here for how many games
# loop here till someone wins
possibleMoves = {}
if i % 2 == 0:
    possibleMoves = sd100[state]
else:
    possibleMoves = sd1000[state]

sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
nextMove = list(sortedMoves.keys())[-1]
i += 1

# sd100Won++
# sd1000Won++


# print final win percentages