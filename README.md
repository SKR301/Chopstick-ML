# Chopstick-ML
A study on kids game called "Chopstick"

### Studies
- Generate data:  
  - **4444**, **4344** and **1110** states can't be achieved    
- Model Fight
  - **100** and **1000** went to loop
  - Rest all stopped after 12 iterations
- Model Comparison
  - Models gain knowledge only after **10000** games
- Playing against human
  - Even the 10000000 game play isn't enough.
  - Confirmed win: **1111** -> **2111** -> **1130** -> **4011** -> **1131** -> **4111** -> **1041** -> **1010** -> **2010** -> **1011** -> **2110** -> **1030** -> **4010** -> **0040**
  - Confirmed win: **1111** -> **2111** -> **1130** -> **4011** -> **1131** -> **3211** -> **1141** -> **1011** -> **2110** -> **1030** -> **4010** -> **0040** 
- Robustness Check
  - **100000** is most robust surprisingly. Still doesn't won. **10000000000** iterations, no help.
  
- Conclusion: RANDOM REINFORCEMENT LEARNING ISN'T THE BEST OPTION FOR THIS GAME!

## Play game
<img src="https://user-images.githubusercontent.com/47807051/170525715-e6fa4b81-ad70-4b19-ac70-581e28447345.png" width=30% height=30%>

### Start:
1. Clone to repo.
2. Open command prompt and execute `yarn install` to load all the packages required.
3. Then execute `expo start --web` to start the game in your browser.

### How To Play:
https://www.wikihow.com/Play-Chopsticks
- You'll play against computer.
- Bottom 2 coins are your values.
- Both will start with two 1s.
- You'll play first move.
- You can move in 2 ways: 
  1. HIT: _Select one of your values, and then one of opponents value. The values will be added, modded by 5 and set to opponent_.
  2. DISTRIBUTE: _Select one of your values and then another, you can re-configure the your values in different way_.
- **GOAL: Remove all of opponets values (i.e. Make opponent have two 0s)**.


