"""
This file will be used to fight two trained data models against each other and generate win percentage for both to see how much better one is. MAY THE BEST MODEL WIN.
Thesis: Model with more game play should win more
Observation:
- 100 and 1000 will goto loop
- Maybe models give same graph
"""

from modelCollection import stateData100 as sd100
from modelCollection import stateData1000 as sd1000
from modelCollection import stateData10000 as sd10000
from modelCollection import stateData100000 as sd100000
from modelCollection import stateData1000000 as sd1000000
from modelCollection import stateData10000000 as sd10000000
import sys

i = 0
state = '1111'
totalGames = 100
stateData1 = {}
stateData2 = {}

if sys.argv[1] == '100':
    stateData1 = sd100
if sys.argv[1] == '1000':
    stateData1 = sd1000
if sys.argv[1] == '10000':
    stateData1 = sd10000
if sys.argv[1] == '100000':
    stateData1 = sd100000
if sys.argv[1] == '1000000':
    stateData1 = sd1000000
if sys.argv[1] == '10000000':
    stateData1 = sd10000000

if sys.argv[2] == '100':
    stateData2 = sd100
if sys.argv[2] == '1000':
    stateData2 = sd1000
if sys.argv[2] == '10000':
    stateData2 = sd10000
if sys.argv[2] == '100000':
    stateData2 = sd100000
if sys.argv[2] == '1000000':
    stateData2 = sd1000000
if sys.argv[2] == '10000000':
    stateData2 = sd10000000

while state[:2] != '00':
    possibleMoves = {}
    if i % 2 == 0:
        possibleMoves = stateData1[state]
    else:
        possibleMoves = stateData2[state]
    
    sortedMoves = dict(sorted(possibleMoves.items(), key=lambda item: item[1]))
    state = list(sortedMoves.keys())[-1]
    i += 1
    print(state)