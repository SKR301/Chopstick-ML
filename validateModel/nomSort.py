"""
This module checks if the prepared model is robust or not and analyze it.
Also normalize it first.
Robust model: There is only one best solution from any given stage.
"""

from modelCollection import stateData10000000 as states

normalizedData = {}

for key in states:
    value = states[key]
    factor = 1.0 / sum(value.values())
    for keyVal in value:
        value[keyVal] = value[keyVal] * factor
    
    sortedMoves = dict(sorted(value.items(), key=lambda item: item[1]))
    normalizedData[key] = sortedMoves
    

thresholds = [0.5, 0.75, 0.9]

for threshold in thresholds:
    count = 0
    