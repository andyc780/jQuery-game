# Blitz Clicker
This is a quick reaction and decision making game where different colored squares will quickly illuminate on a grid ranging from 5x5 to 8x8 (you can choose the size). These squares will only appear momentarily so you must act fast into clicking the squares because they will fade away. There will be multiple types of squares as these squares can provide you with varying amounts of points and positive effects such as slower fading times or double points, or adverse effects such as losing points, getting negative effects such as faster fading times, and an accuracy reduction. Clicking on a blank sqaure will also result in a 1 point deduction and an accuracy deduction as well.
The end goal is the acquire as much points as possible before the timer ends. Final accuracy will also affect your score as the formula is (total score * accuracy). Accuracy is measured in decimals (ex: 1.00 = 100% and 0.5 = 50%) and will be cacluated ((total - missed)/total * 100) so accuracy matters. This game will be developed using jQuery with CSS for styling and HTML for structuring purposes but mainly jQuery.

## Authors

- [@andyc780](https://www.github.com/andyc780)


## Features

- Adjustable Speeds
- Changing Grid Sizes
- Difficulty Changes
- Gambling Mode (all mystery squares)
- Expert Mode (explained below on 'Square Information')


## Square Information
- Blue Square = 1 point
- Purple/Indigo Square = 3 points
- Golden Square = 5 points
- Gray Square = Mystery Square (ranging from -30 to +10 points)
- Light Red Square = -3 points
- Dark Red Square = -6 points  
- Blank Square = -1 point & - double the accuracy.
- '<<' Square = Fading speed halves for 10s (positive)
- '>>' Square = Fading speed doubles for 15s (negative) and accuracy reduction
For Expert Mode, All positive squares will give half the points, accuracy penalty is doubled, mystery squares range from (-40 to +15 points), negative tiles will give double the negative points, and speed is increased by 20%.
