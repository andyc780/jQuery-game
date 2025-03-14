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
POSITIVES:
- Light Blue Square = 1 Point, + 0.5 HP.
- Light Green Square = 2 Points, + 0.5 HP.
- Dark Green Square = 5 Points, + 0.5 HP.
- Golden Square = 8 Points, + 1HP
NEGATIVES:
- Light Red Square = -3 Points, -5 HP
- Dark Red Square = -5 Points, -7 HP
- Purple Square = - 10 Points, -10 HP
NEUTRAL:
- Gray Mystery Square = Obtain a point value ranging from (-15 to +15), and a health value of (-5 to + 2 HP)
- Orange Effect Square = Gives you a randomized effect, good or bad and displays it on the side.
Note About Square Information.
When a square in the positive type is faded away before you can click on it, it counts as a miss and you lose 3 HP and lose accuracy.
For Expert Mode, Point reduction and health reduction will increase to an additional -5 Points, and -5 Health (for example: -3 HP will now be -8)
If a Neutral or Negative square type fades away, nothing happens and no points or health will be lost or gained.


## Time and Stage Events
As you progress through the game, you will reach different stages and soon after those stages, game fatigue begins to settle in.
- Beginning Stage (start of the game): The intro stage, welcoming you into the game, no effects here.
- Stage 1 (): Background color change to simulate altitude change, also no effects here yet.
- Stage 2 (); Background color change again with clouds and gain 30 points and recover 10 HP.
- Stage 3 (): Clouds fade away, background darkens, gain an additional 50 points and 15 HP.
- Final Stage (); Background fades to black, stars fade in, gain an additional 80 points and some extra accuracy if below 100%.
- Fatigue 1 (): Lose 5 HP, Accuracy deduction when missing is doubled.
- Fatigue 2 (); Lose 10 HP, Points gained will now be subtracted by 1. (except for light blue), so for example, golden squares now give 7 points now.
- Fatigue 3 (); Health starts to periodically decrease with -1 for every 3 seconds, +5 Tile Density (total of 7 now), and health reduction events being doubled.


## Quotes When Game Ends
- Beginning: "Didn't even make it off the ground. Pro Tip: Try Left Clicking?"
- Stage 1: "Lift off! Oh wait, you fell. Maybe next time"
- Stage 2: "Pretty high you got there. One day, you'll soar above the clouds. But not today."
- Stage 3: "Almost there... Only truly when you reach the stars, maybe you'll understand your journey."
- Final Stage: "You've ascended to the stars above. But at what cost? Strength begins to erode and soon become worthless."
- Fatigue 1: "You've done well. Now rest peacefully up here."
- Fatigue 2: "Your strength is diminishing and yet you still carried on. For what do you seek for?"
- Fatigue 3: "Resistance is futile here. What's the meaning of your journey? To reach the stars? Or unravel truth of your existence?"
- Expert Beginning: "It's best to turn back while you can. Only those with great valor shall succeed."
- Expert Stage 1: (repeat from beginning expert)
- Expert Stage 2: "You've have committed to pursuing the unknown. No more warnings, No more excuses now."
- Expert Stage 3: "You are REALLY devoted in exerting your limits. Quite Impressive... not."
- Expert Final Stage: "You've reached the zenith of your exploration and what do you find? Selcusion. Misery. Turmoil."
- Expert Fatigue 1: "The concept of "strength" completely void. Nothing can save you now. Look forward and accept your fate.
- Expert Fatigue 2: "In the midst of chaos and dejection, a speckle of light trickles in your sight. Your sanity has clouded however and now you are confined here, relapsing until the end of time."
- Expert Fatigue 3: "In retrospect, the "memories" of your journey was just a figment of your imagination. Your journey never truly existed to begin with."
