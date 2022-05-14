"""
This file will be used to fight two trained data models against each other and generate win percentage for both to see how much better one is. MAY THE BEST MODEL WIN.
Thesis: Model with more game play should win more
Observation:
- only sd100 stops when played with self 
- when played against themselves, they went to loop         
"""

# Add models to compare 
from modelCollection import stateData100 as sd100
from modelCollection import stateData1000 as sd1000
from modelCollection import stateData10000 as sd10000
from modelCollection import stateData100000 as sd100000
from modelCollection import stateData1000000 as sd1000000
from modelCollection import stateData10000000 as sd10000000

i = 0
state = '1111'
totalGames = 100
sd100Won = 0
sd1000Won = 0

# loop here for how many games
while state[:2] != '00':
    possibleMoves = {}
    if i % 2 == 0:
        possibleMoves = sd100[state]
        sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
        state = list(sortedMoves.keys())[-1]
        i += 1
        print('1:>', state)
    else:
        possibleMoves = sd1000[state]
        sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
        state = list(sortedMoves.keys())[-1]
        i += 1
        print('2:>', state)

# sd100Won++
# sd1000Won++


# print final win percentages