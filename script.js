 // welcome to all of my pain and suffering inside of this file, good luck going through it.

 // Hides all the menus and game elements when the page is loaded and only the intro menu stays.
 $(".intro-menu-chaos").hide();
 $(".tutorial-menu").hide();
 $(".game-over-menu").hide();
 $(".statistics-container").hide();
 $(".main-grid-container-normal").hide();
 $(".main-grid-container-expert").hide();
 $(".main-grid-container-chaos").hide();
 $(".pause-menu").hide();
 $(".countdown-area").hide();

 $(".s-0-box").hide();
 $(".s-1-box").hide();
 $(".s-2-box").hide();
 $(".s-3-box").hide();
 $(".s-4-box").hide();
 $(".fatigue-1").hide();
 $(".fatigue-2").hide();
 $(".fatigue-3").hide();



 $(document).ready(function(){
     // $(".intro-menu").hide();
     // intitalize variables for the game
     // Normal difficulty will be default if the user does not interact with any of the buttons
     let difficulty = "normal";
     let timerElapsed;
     let timer;
     let score = 0;
     // me smashing my head on the table figuring out why the highscore stuff was not working..
     // find out that local storage is stored in string format and im trying to compare a string with an integer, this is bs.
     let highScore = parseFloat(localStorage.getItem("highScore")) || 0; // get the high score from local storage, if it doesn't exist, set it to 0
     let accuracyBuffer = 10; // adds some leniency to the accuracy calculation 
     let totalCount = 0 + accuracyBuffer;
     let misses = 0;
     let accuracy = 1;
     let health;
     let maxHealth;
     let totalPowerupsCollected = 0;
     let inGame = false;
     let isPaused = false;
     let hazeEffect = false; // since pause fades opacity, we need to check if the haze effect is active when resuming or else the effect is lost
     // Random quote will be stored here. Easter egg if you end the game fast enough...
     let randomQuote = "You pressed that button fast... (easter egg)";
     // Audio and music variables here
     let clickSound = new Audio('/audio/click-buttons-ui-menu-sounds-effects-button-7-203601.mp3'); 
     let errorSound = new Audio('/audio/error-sound-39539.mp3');
     let ding = new Audio('/audio/ding-101377.mp3');
     let gameOverSound = new Audio("/audio/piano-logo-reveal-201060.mp3");
     let gameMusic = new Audio('/audio/peaceful-piano-loop-6903.mp3');
     let chaosMusic = new Audio('/audio/intense-gritty-hard-rock-270016.mp3');

     
     // slide in animation for the menu when the document is ready
     $(".intro-menu").css({
         top: '48%',
         opacity: 0
     }).animate({
         top: '50%',
         opacity: 1
     },1000);

     // When the how to play button is clicked
     $(".how-to-play").on("click", function(){
         $(".intro-menu").fadeOut(500);
         $(".intro-chaos-mennu").fadeOut(500);
         $(".tutorial-menu").fadeIn(1000);
     });
     // Return back to home page in the tutorial menu
     $(".return-back-tutorial").on("click", function(){
         $(".tutorial-menu").fadeOut(500);
         $(".intro-menu").fadeIn(1000);
     });
     // If you want to select normal diff, changes bg color and text
     $(".normal-button").on("click", function(){
         difficulty = "normal";
         $('.intro-menu').css({
             backgroundColor: '#ebdf8a',
             color: '#333',
         }); 
         
         $(".difficulty-message").html('<em>"For those that are willing to embark on an ordinary path.</em>');
         $(".difficulty-message").fadeOut(0);
         $(".difficulty-message").fadeIn(750);
     });
     // If you want to play expert, changes bg again and the text color too.
     $(".expert-button").on("click", function(){
         difficulty = "expert";
         $('.intro-menu').css({
             backgroundColor: '#a10b1a',
             color: '#f2bbbb',
             
         });
         $(".difficulty-message").html('<em>"Strength is futile in the midst of chaos and destruction."</em');
         $(".difficulty-message").fadeOut(0);
         $(".difficulty-message").fadeIn(750);
     });
     // If you press the button in the bottom right corner, you get the chaos difficulty, which is the hardest difficulty in the game.
     // not really meant to be played comfortably but yeah.
     $(".chaos-button").on("click", function(){
         difficulty = "chaos";
         $(".intro-menu").fadeOut(500);
         $(".intro-menu-chaos").fadeIn(1000);
     });
     $(".turn-back").on("click", function(){
        location.reload();
     });

     // Clears high score from local storage and sets it to 0.
     $("#clear-high-score").on("click", function(){
         localStorage.removeItem("highScore");
         highScore = 0;
         $("#clear-high-score").fadeOut(3000);
         $("#clear-high-score").html("Score Cleared!");
     });
     // This button will start the game by hiding the start menus and starting up the countdown.
     $(".submit, .submit-chaos").on("click", function(){
         $(".intro-menu").fadeOut(300);
         $(".intro-menu-chaos").fadeOut(300);
         $(".tutorial-menu").fadeOut(300);
         if(difficulty == "normal"){
             $(".main-grid-container-normal").fadeIn(1000);
             $(".normal-stat").fadeIn(1000);
         }
         else if(difficulty == "expert")
         {
             $(".main-grid-container-expert").fadeIn(1000);
             $(".expert-stat").fadeIn(1000);
         }
         else if(difficulty == "chaos")
         {
             $(".main-grid-container-chaos").fadeIn(1000);
             $(".chaos-stat").fadeIn(1000);
         }
         startCountDown();
     });
     $(".def-button").on("click", function(){
         clickSound.pause();
         clickSound.currentTime = 0;
         clickSound.play();
     });
     $()

     // During the game, there will be an end game button. Click to end the game immediately and go to the game over screen.
    
     $('.end-game').on("click", function(){
         gameMusic.pause();
         chaosMusic.pause();
         setTimeout(function() {
             gameOverSound.volume = 0.4; // set the volume to 40%
             gameOverSound.play();
         }, 1000); 
         clearInterval(timerElapsed);
         clearInterval(timer);
         let finalScore = (score * (accuracy / 100)).toFixed(1);
         // parsing stuff in the if statement
        if (finalScore > highScore) {
            highScore = parseFloat(finalScore);
            localStorage.setItem("highScore", highScore); // Then store it in localStorage
        }
         let finalAccuracy = accuracy;
         let finalRawScore = score;
         inGame = false; // prevent pause from being clicked again
         isPaused = false;
         $(".container").fadeOut(500);
         $(".pause-menu").fadeOut(500);  
         $(".over-title").html("Game Over!");
         $(".game-over-menu").delay(1000).fadeIn(1000);
         $(".final-score").html("Your Final Score: <span style='color:gold; font-size:1.5rem;'>" + finalScore + "</span>");
         $(".g-acc").html("Accuracy: <span style='color:#66f224'>" + finalAccuracy + "%</span>");
         $(".high-score").html("High Score: <span style='color:lightgreen; font-size:1.25rem;'>" + highScore + "</span>");
         $(".raw-acc").html("Raw Score: <span style='color:#3845d6'>" + finalRawScore + "</span>");
         $(".p-ups-obtained").html("Powerups Obtained: <span style='color:#eee'>" + totalPowerupsCollected + "</span>");
         $(".end-quote").html('<em>"' + randomQuote + '"</em>');
         $(".time-elapsed").html('Time Elapsed: <span style="color:#eee">' + hours + ':' + minutes + ':' + seconds + '.' + miliseconds + '</span>');
     });
     // Pause when the 'p' key is pressed, or when the button is clicked itself
     $(document).on("keydown", function(e) {
         if (e.key.toLowerCase() === "p" && inGame) {
             {
                 isPaused = true;
                 clearInterval(timerElapsed);
                 clearInterval(timer);
                 $(".container").animate({
                     opacity: 0.25
                 });
                 $(".pause-menu").fadeIn(300)
                 $(".pause-menu").css({
                     zIndex: 2
                 });
                 $(".container").css("pointer-events", "none"); // make the game board unable to be cliked when paused
             }
         }
     });
     // Same for this but if the button is actually clicked
     $(".pause").on("click", function(){
         isPaused = true;
         clearInterval(timerElapsed);
         clearInterval(timer);
         $(".container").animate({
             opacity: 0.25
         });
         $(".pause-menu").fadeIn(300)
         $(".pause-menu").css({
             zIndex: 2
         });
         $(".container").css("pointer-events", "none"); // make the game board unable to be cliked when paused
     });
     
     // Pressing escape during the game will end it early.
     $(document).on("keydown", function(e) {
         if (e.key === "Escape" && inGame) {
             $(".end-game").click();
         }
     });

     // Resume playing the game in the pause menu
     $(".resume").on("click", function(){
         isPaused = false;
         // // health = temp;
         // $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health + ' HP</span></h4>'); 
         clearInterval(timerElapsed);
         clearInterval(timer);
         setTimeout(function(){
             startGame(difficulty);
         },200);
         
         $(".container").css("pointer-events", "auto"); // make the game board clickable again
         if(hazeEffect == true){
             $(".container").css("opacity", 0.45);
         }
         else{
             $(".container").animate({
                 opacity: 1
             });
         }
         $(".pause-menu").fadeOut(300);
         $(".pause-menu").css({
             zIndex: -1
         });
     });

     // in the game over screen, there is a restart button which just refreshes the webpage so you can play again.
     // easy way out lol
     $(".restart").on("click", function(){
         location.reload();
     });
 // all the painful logic is located starting down here. 
 // Timer function for the game, also recorded when the game ends.
     function startCountDown(){
         $(".countdown-area").fadeIn(700);
         let seconds = 4;
         let time;
         // making pointer events to none so nothing is clicked prematurely.
         $(".container").css({
             pointerEvents: "none"
         });
         $(".container").animate({
             opacity: 0.5
         });
         time = setInterval(function(){
             seconds--;
             if(seconds == 0){
                 $(".countdown-area").fadeOut(200);
                 $(".container").css({
                     pointerEvents: "auto"
                 });
                 startGame(difficulty);
                 clearInterval(time);
                 $(".container").css({
                     opacity: 1
                 });
             }
             $(".countdown-area").html(seconds);
         }, 1000);
     }
     // Variables for fatigue and stage events
     let accuracyPenaltyMultiplier = 1;
     let hpReductionMultiplier = 1;
     let pointReduction = 0;
     let hpDecay;

     // Variables for timer function below
     let miliseconds = 0;
     let seconds = 0;
     let minutes = 0;
     let hours = 0;
     let totalSeconds = 0; // used for time events
     function startTimer(){
         if(difficulty == "chaos"){
             chaosMusic.pause();
             chaosMusic.currentTime = 0; // reset the music to the start
             chaosMusic.volume = 0.5; // set the volume to 40%
             chaosMusic.loop = true; // loop the music
             chaosMusic.play();
         }
         else{
             gameMusic.pause();
             gameMusic.currentTime = 0; // reset the music to the start
             gameMusic.volume = 0.4; // set the volume to 40%
             gameMusic.loop = true; // loop the music
             gameMusic.play();
         }

         // the clock on the side of the game board
         timerElapsed = setInterval(function(){
             miliseconds += 1;
             if(miliseconds == 10){
                 miliseconds = 0;
                 seconds += 1;
                 totalSeconds += 1;
             }
             if(seconds == 60){
                 seconds = 0;
                 minutes += 1;

             }
             if(minutes == 60){
                 minutes = 0;
                 hours += 1;
             }
             // As time passes the events below here will be displayed to the user.
             // Measured in seconds
             if(totalSeconds == 0){
                 $(".s-0-box").show().css({
                     opacity: 0,
                     top: '1%'
                 }).animate({
                     opacity: 1,
                     top: '2%'
                 }, 1000).delay(5500).fadeOut(1000);
                 if(difficulty == "expert"){
                     randomQuote = "It's best to turn back while you can. Only those with great valor shall succeed.";
                 }
                 else{
                     randomQuote = "Didn't even make it off the ground. Pro Tip: Try Left Clicking?";
                 }
                 if(difficulty == "chaos"){
                     randomQuote = "You signed up for this. Pay the consequences and suffer. You should've just turned back and played the normal game.";
                 }
             }
            if(totalSeconds == 25){ // 25 seconds in the game Stage 1
                 $("body").css({
                     backgroundColor: "#4488c8"
                 });
                 $(".s-1-box").show().css({
                     opacity: 0,
                     top: '0%'
                 }).animate({
                     opacity: 1,
                     top: '2%'
                 }, 1000).delay(5500).fadeOut(1000);
                 if(difficulty == "expert"){
                     randomQuote = "It's best to turn back while you can. Only those with great valor shall succeed.";
                 }
                 else{
                     randomQuote = "Lift off! Oh wait, you fell. Maybe next time";
                 }
                 if(difficulty == "chaos"){
                     randomQuote = "You signed up for this. Pay the consequences and suffer. You should've just turned back and played the normal game.";
                 }
             }
             if(totalSeconds == 90){ // 1 minute and 30 seconds into the game 90s Stage 2
                 $("body").css({
                     backgroundColor: "#0b238b"
                 });
                 score += 3; // +30 points over a second
                 $(".score").html('<h4>Score: <span style = "color:#2eb8b5"> ' + score + '</span></h4>');
                 if((health + 10) > maxHealth){ // if the health is above the max, set it to the max
                     health = maxHealth;
                 } else {
                     health += 1; // +10 HP over a second
                 }
                 $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1) + ' HP</span></h4>');
                 $(".s-2-box").show().css({
                     opacity: 0,
                     top: '0%'
                 }).animate({
                     opacity: 1,
                     top: '2%'
                 }, 1000).delay(5500).fadeOut(1000);
                 generateClouds();
                 if(difficulty == "expert"){
                     randomQuote = "You've have committed to pursuing the unknown. No more warnings, No more excuses now.";
                 }
                 else{
                     randomQuote = "Pretty high you got there. One day, you'll soar above the clouds. But not today.";
                 }
                 if(difficulty == "chaos"){
                     randomQuote = "You signed up for this. Pay the consequences and suffer. You should've just turned back and played the normal game.";
                 }
             }
             if(totalSeconds == 135){ // 2 minutes and 15 seconds into the game 135s Stage 3
                 $("body").css({
                     backgroundColor: "#051e47"
                 });
                 score += 5; // +50 score over a second
                 $(".score").html('<h4>Score: <span style = "color:#2eb8b5"> ' + score + '</span></h4>');
                 if((health + 15) > maxHealth){ // if the health is above the max, set it to the max
                     health = maxHealth;
                 } else {
                     health += 1.5; // +15 HP over a second
                 }
                 totalCount += 3;
                 accuracy = ((totalCount - misses) / totalCount) * 100; // calculate the accuracy
                 if(accuracy > 100){
                     accuracy = 100;
                 }
                 $(".acc").html('<h4>Accuracy: <span style = "color:#429820">' + accuracy.toFixed(2) + '%</span></h4>');
                 $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1) + ' HP</span></h4>');
                 $(".s-3-box").show().css({
                     opacity: 0,
                     top: '0%'
                 }).animate({
                     opacity: 1,
                     top: '2%'
                 }, 1000).delay(5500).fadeOut(1000);
                 fadeClouds();
                 if(difficulty == "expert"){
                     randomQuote = "You are REALLY devoted in exerting your limits. Quite Impressive... not.";
                 }
                 else{
                     randomQuote = "Almost there... Only truly when you reach the stars, maybe you'll understand your journey.";
                 }
                 if(difficulty == "chaos"){
                     randomQuote = "You signed up for this. Pay the consequences and suffer. You should've just turned back and played the normal game.";
                 }
             }
             if(totalSeconds == 180){ // 3 minutes into the game 180s Stage 4
                 $("body").css({
                     backgroundColor: "#121212"
                 });
                 score += 8; // +80 score over a second
                 totalCount += 2;
                 $(".score").html('<h4>Score: <span style = "color:#2eb8b5"> ' + score + '</span></h4>');
                 $(".s-4-box").show().css({
                     opacity: 0,
                     top: '0%'
                 }).animate({
                     opacity: 1,
                     top: '2%'
                 }, 1000).delay(5500).fadeOut(1000);
                 generateStars();
                 if(difficulty == "expert"){
                     randomQuote =  "You've reached the zenith of your exploration and what do you find? Selcusion. Misery. Turmoil.";
                 }
                 else{
                     randomQuote = "You've ascended to the stars above. But at what cost? Strength begins to erode and soon become worthless.";
                 }
                 if(difficulty == "chaos"){
                     randomQuote = "You signed up for this. Pay the consequences and suffer. You should've just turned back and played the normal game.";
                 }

             }

             if(totalSeconds == 225){ // 3 minutes and 45 seconds into the game 225s Fatigue 1
                 $(".fatigue-1").show();
                 accuracyPenaltyMultiplier = 2;
                 health -= 0.5; // -5 HP over a second
                 cycleButtonAmount += 0.2; // add 2 extra buttons per cycle over 1 second
                 $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1) + ' HP</span></h4>');
                 if(health <= 0){
                     gameOver();
                     clearTimeout(delay);
                     return;
                 }
                 $(".fatigue-1").show().css({
                     opacity: 0,
                     top: '0%'
                 }).animate({
                     opacity: 1,
                     top: '2%'
                 }, 1000).delay(5500).fadeOut(1000);
                 if(difficulty == "expert"){
                     randomQuote = 'The concept of "strength" completely void. Nothing can save you now. Look forward and accept your fate.';
                 }
                 else{
                     randomQuote = "You've done well. Now rest peacefully up here.";
                 }
                 if(difficulty == "chaos"){
                     randomQuote = "You signed up for this. Pay the consequences and suffer. You should've just turned back and played the normal game.";
                 }
             }
             if(totalSeconds == 270) // 4 minutes and 30 seconds into the game 270s Fatigue 2
             {
                 $(".fatigue-2").show();
                 health -= 1; // -10HP over a second
                 $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1) + ' HP</span></h4>');
                 pointReduction = 1;
                 if(health <= 0){
                     gameOver();
                     clearTimeout(delay);
                     return;
                 }
                 $(".fatigue-2").show().css({
                     opacity: 0,
                     top: '0%'
                 }).animate({
                     opacity: 1,
                     top: '2%'
                 }, 1000).delay(5500).fadeOut(1000);
                 if(difficulty == "expert"){
                     randomQuote = "In the midst of chaos and dejection, a speckle of light trickles in your sight. Your sanity has clouded however and now you are confined here, relapsing until the end of time.";
                 }
                 else{
                     randomQuote = "Your strength is diminishing and yet you still carried on. For what do you seek for?";
                 }
                 if(difficulty == "chaos"){
                     randomQuote = "You signed up for this. Pay the consequences and suffer. You should've just turned back and played the normal game.";
                 }
             }
             if(totalSeconds == 315){ // 5 minutes and 15 seconds into the game 315s Fatigue 3
                 $(".fatigue-3").show();
                 hpReductionMultiplier = 2;
                 cycleButtonAmount += 0.5; // add 5 extra buttons per cycle over 1 second
                 $(".fatigue-3").show().css({
                     opacity: 0,
                     top: '0%'
                 }).animate({
                     opacity: 1,
                     top: '2%'
                 }, 1000).delay(5500).fadeOut(1000);
                 hpDecay = setInterval(function(){
                     health -= 0.1 // decay health by 1 over 1 second (0.1 decrement every 100ms)
                     $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1)+ ' HP</span></h4>');
                     if(health <= 0){
                         clearInterval(hpDecay);
                         gameOver();
                         clearTimeout(delay);
                         return;
                     }
                 }, 3000);
                 if(difficulty == "expert"){
                     randomQuote =  'In retrospect, the "memories" of your journey was just a figment of your imagination. Your journey never truly existed to begin with.';
                 }
                 else{
                     randomQuote = "Resistance is futile here. What's the meaning of your journey? To reach the stars? Or unravel truth of your existence?"
                 }
                 if(difficulty == "chaos"){
                     randomQuote = "You signed up for this. Pay the consequences and suffer. You should've just turned back and played the normal game.";
                 }
             }
             $(".time-elapsed").html('<h4>Time Elapsed: <span style="color:#eba442">' + hours + ':' + minutes + ':' + seconds + '.' + miliseconds + '</span></h4>');
         },100);
     }

     // When your HP runs out, the game ends and this function is called.
     function gameOver(){
         gameMusic.pause();
         chaosMusic.pause();
         if (!gameOverSound.played || gameOverSound.played.length === 0) {
             setTimeout(function() {
                 gameOverSound.pause();
                 gameOverSound.currentTime = 0;
                 gameOverSound.volume = 0.25; // set the volume to 25%
                 gameOverSound.play();
             }, 1000); 
         }
         clearInterval(timerElapsed);
         clearInterval(timer);
         // final score declarations
         let finalScore = (score * (accuracy / 100)).toFixed(1);
         // If the final score is higher than the final score, than this will be the new high score.
        //  console.log("Final Score:" + finalScore);
        //  console.log("Stored High Score:" + highScore);
         if (finalScore > highScore) {
            highScore = parseFloat(finalScore);
            localStorage.setItem("highScore", highScore); // Then store it in localStorage
        }
         let finalAccuracy = accuracy;
         let finalRawScore = score;
         inGame = false; // prevent pause from being clicked again
         isPaused = false;
         // displaying stats to the user and fading out the game board
         $(".pause-menu").fadeOut(500);
         $(".over-title").html("Game Over!");
         $(".container").fadeOut(500);
         $(".game-over-menu").delay(1000).fadeIn(1000);
         $(".final-score").html("Your Final Score: <span style='color:gold; font-size:1.5rem;'>" + finalScore + "</span>");
         $(".high-score").html("High Score: <span style='color:lightgreen; font-size:1.25rem;'>" + highScore + "</span>");
         $(".g-acc").html("Accuracy: <span style='color:#66f224'>" + finalAccuracy + "%</span>");
         $(".raw-acc").html("Raw Score: <span style='color:#3845d6'>" + finalRawScore + "</span>");
         $(".p-ups-obtained").html("Powerups Obtained: <span style='color:#eee'>" + totalPowerupsCollected + "</span>");
         $(".end-quote").html('<em>"' + randomQuote + '"</em>');
         $(".time-elapsed").html('Time Elapsed: <span style="color:#eee">' + hours + ':' + minutes + ':' + seconds + '.' + miliseconds + '</span>');
         return;


     }
     // For the final stage, stars will be generated to make the background look nicer and imitate space kinda.
     function generateStars(){
         // When stage 4 is reached, stars will start appearing in the background.
         let starCount = 15; // number of stars to generate * 10
         for (let i = 0; i < starCount; i++) {
             let stars = $('<div class="stars"></div>');
             let randomTop = Math.floor(Math.random() * 100) + 1; // random top position between 1 and 100
             let randomLeft = Math.floor(Math.random() * 100) + 1; // random left position between 1 and 100
             stars.css({
                 position: 'absolute',
                 top: randomTop + 'vh',
                 left: randomLeft + 'vw'
             });
             $('body').append(stars);
         }

     }
     // For the second stage, make it look like the user is soaring up into the sky and beyond.
     function generateClouds(){
         // When stage 2 is reached, clouds will start appearing in the background, however it will be removed in stage 3.
         let cloudCount = 2; // number of clouds to generate * 10.
         for (let i = 0; i < cloudCount; i++) {
             let clouds = $('<div class="clouds"></div>');
             let randomTop = Math.floor(Math.random() * 100) + 1; // random top position between 1 and 100
             let randomLeft = Math.floor(Math.random() * 100) + 1; // random left position between 1 and 100
             clouds.css({
                 position: 'absolute',
                 top: randomTop + 'vh',
                 left: randomLeft + 'vw'
             });
             $('body').append(clouds);
         }
     }
     function fadeClouds(){
         $(".clouds").fadeOut(2000, function() {
             $(this).remove();
         });
     }

     
     // The main game starting function
     // all square button declaration here, will be changed depending on the difficulty.
     // effects array below here
     let randomEffects = [
         "speedUp",
         "regeneration",
         "haze",
         "glassCannon",
         "shrink",
         "increasePoints",
         "shield"
     ];
     // checking how many times an effect has triggered, used for the switch
     // cases that will be used below to make effects more smoother
     let speedUpCount = 0;
     let regenCount = 0;
     let hazeCount = 0;
     let glassCannonCount = 0;
     let shrinkCount = 0;
     let increasePointsCount = 0;
     let shieldCount = 0;

     let speedUpTime;
     let regenTime;
     let hazeTime;
     let glassCannonTime;
     let shrinkTime;
     let increasePointsTime;
     let shieldTime;

     // array of all the buttons in the game
     let buttonEffects = [
         "good1",
         "good2",
         "good3",
         "good4",
         "bad1",
         "bad2",
         "bad3",
         "mystery",
     ];
     // more variable declaration used for the game here.
    //  let totalButtons;
     let cycleButtonAmount;
     let cycleTime;
     let buttons; // store button data based on difficulty later
     let delay;
     let glassCannonMultiplier = 1; // used for the glass cannon effect
     let baseSpeed;
     let startGameTimes = 0; // for resuming button, prevent the difficuly statments being executed again and restoring HP and stuff.
     let expertPenaltyHP = 0; // for expert. 0 will be normal, 5 is expert
     let expertPenaltyPoints = 0; // for expert. 0 will be normal, 5 is expert
     let pointBonus = 0; // increase point effect
     let shieldProtection = 1; // used for the shield effect 1 by default and changed to 0 for no health loss.

     let chaosHealthMultiplier = 1;  // for chaos mode when clicking on good buttons, will be changed to 0 as no health should be given for good buttons.
     // i realized that the line above was removed after publishing the assingment soo yeahh rip

     function startGame(difficulty){
         startTimer();
         inGame = true;
            // checks for what difficulty the user chose and will adjust the game accordingly.
         if(difficulty == "normal" && startGameTimes == 0){
             health = 100;
             maxHealth = 100;
             $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1) + ' HP</span></h4>')
             totalButtons = 25;
             // This will determine how many buttons will be selected in a single cycle of buttons.
             // More buttons would mean harder and less would be easier.
             cycleButtonAmount = 9;
             cycleTime = 5000;
             baseSpeed = cycleTime;
             buttons = $(".main-grid-container-normal button"); // collect buttons
         } 
         if(difficulty == "expert" && startGameTimes == 0){
            // Tiles that give bad effects will reduce and extra 5hp and 5 score
             expertPenaltyHP = 5;
             expertPenaltyPoints = 5;
             health = 50;
             maxHealth = 50;
             $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1) + ' HP</span></h4>');
             totalButtons = 36;
             cycleButtonAmount = 18; // how many buttons can exists in a cycle. 
             cycleTime = 4500; // -0.5s from default
             baseSpeed = cycleTime;
             buttons = $(".main-grid-container-expert button"); // collect buttons
         }
         if(difficulty == "chaos" && startGameTimes == 0){
             expertPenaltyHP = 10;
             expertPenaltyPoints = 20;
             chaosHealthMultiplier = 0; // No health will be given for normal squares.
             health = 100;
             maxHealth = 100;
             $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1) + ' HP</span></h4>');
             totalButtons = 64;
             cycleButtonAmount = 36; // how many buttons can exists in a cycle.
             cycleTime = 5000; // +0.5 seconds because it will be needed for such a large board.
             baseSpeed = cycleTime;
             buttons = $(".main-grid-container-chaos button"); // collect buttons
         }
         // prevents the game from being restarted again from pause or anything else
         startGameTimes += 1;
         // select a couple buttons instantly when the game starts.
         // cycles infinitely until the game ends.
         // the amount of buttons selected will be based on the difficulty.
         selectRandomButtons(buttons, cycleButtonAmount);
         timer = setInterval(function(){
             selectRandomButtons(buttons, cycleButtonAmount);
         }, cycleTime);
     }

     let selectEffect;
     let hasEffect = false;
   
     function selectRandomButtons(buttons , cycleButtonAmount){
         let finalRandomButton = [];
         let selectSingleButton;

          // Roll a random chance for an effect to appear in this specific cycle.
          // If the chance is hit, it will reduce the cycleButtonAmount by 1 and instead replace it with the effect button
          // 10% chance per cycle for an effect to appear
         let chance = Math.floor(Math.random() * 6) + 1;
         if(chance == 5){
             hasEffect = true;
             selectEffect = randomEffects[Math.floor(Math.random() * randomEffects.length)];
         }
         for(let i = 0; i < cycleButtonAmount; i++){
             selectSingleButton = Math.floor(Math.random() * buttons.length);
             // finalRandomButton.push(selectSingleButton);
             if(finalRandomButton.includes(selectSingleButton)){
                 // checks for potential duplicates in the event the random number generator gets the same number. (will equal true)
                 // skips the array push entirely and start the loop iteraion over.
                 i--;
             } else {
                 // push data into the array.
                 finalRandomButton.push(selectSingleButton);
             }
         }
         // make the buttons fade in with css for a certain set amount of time, and then fade out.
         // if the buttons are clicked early, then the button will fade out and points will be awarded.
         // if the buttons are not clicked, then the button will fade out, accuracy and health will be deducted.
         // if the user clicks a random blank button, apply the same as above if they were not clicked.
         for(let i = 0; i < finalRandomButton.length; i++){
             // Assign random classes to the buttons for the game.
             let randomSquare = buttonEffects[Math.floor(Math.random() * buttonEffects.length)];
             let button = $(buttons[finalRandomButton[i]]);
             // checks for effects and will give one if there is
             if (hasEffect) {
                 button.attr('id', 'effect');
                 hasEffect = false;
             }
             else{
                 button.attr('id', randomSquare);
             }
             // when a button is clicked
             button.on("click", function(){
                 // clickSound.pause(); // Pause the audio if it's already playing
                 // clickSound.currentTime = 0; // Reset audio to the start
                 // clickSound.play(); // Play the sound
                 if (button.attr('id') == 'effect') {
                     ding.pause();
                     ding.currentTime = 0;
                     ding.play();
                     totalPowerupsCollected++;
                     for (let i = 0; i < randomEffects.length; i++) {
                        // All effects switch statments, will give effects and display on the effects container
                         if (randomEffects[i] === selectEffect) {
                             switch (selectEffect) {
                                 case "speedUp":
                                    // this if statement checks for any potential duplicate on going effects, this will be used for every case
                                     if(speedUpCount){
                                         clearInterval(speedUpTime);
                                         $(".effects-container").find(".speedUp").remove(); // remove class from the container
                                         cycleTime = baseSpeed;
                                     }
                                     speedUpCount = true;
                                     cycleTime = cycleTime - 1000; // 1 second faster
                                     $(".effects-container").append('<h4 class="speedUp">Speed Up: 20s</h4>');
                                     let speedUpSeconds = 20; // total seconds or duration of effect
                                     speedUpTime = setInterval(function() {
                                        // if pasued, timer also pauses with this statement, also used for all statements
                                         if(!isPaused){
                                             speedUpSeconds--;
                                         }
                                         // ends effects when time ends too.
                                         if (speedUpSeconds <= 0) {
                                             clearInterval(speedUpTime);
                                             cycleTime = baseSpeed; // return to normal speed after 20 seconds
                                             $(".effects-container").find(".speedUp").remove();
                                             speedUpCount = false;
                                         }
                                         // updates the container every second for the user to see
                                         $(".speedUp").html("Speed Up: " + speedUpSeconds + "s");

                                     }, 1000);
                                     break;
                                 case "regeneration":
                                     if(regenCount){
                                         clearInterval(regenTime);
                                         $(".effects-container").find(".regeneration").remove();
                                     }
                                     regenCount= true;
                                     $(".effects-container").append('<h4 class="regeneration">Regeneration: 15s</h4>');
                                     let regenSeconds = 15;
                                     regenTime = setInterval(function() {
                                         if(!isPaused){
                                             regenSeconds--;
                                         }
                                         $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1) + ' HP</span></h4>');
                                         if((health + 1) < maxHealth){
                                             health += 1;
                                         }
                                         else{
                                             health = 100;
                                         }
                                         if (regenSeconds <= 0) {
                                             clearInterval(regenTime);
                                             $(".effects-container").find(".regeneration").remove();
                                             regenCount = false;
                                         }
                                         $(".regeneration").html("Regeneration: " + regenSeconds + "s");
                                     }, 1000);
                                     break;

                                 case "haze":
                                     hazeEffect = true;
                                     if(hazeCount){
                                         clearInterval(hazeTime);
                                         $(".effects-container").find(".haze").remove();
                                         $(".container").css("opacity", 1);
                                     }
                                     hazeCount = true;
                                     $(".container").css("opacity", 0.45);
                                     $(".effects-container").append('<h4 class="haze">Haze: 15s</h4>');
                                     let hazeSeconds = 15;
                                     hazeTime = setInterval(function() {
                                         if(!isPaused){
                                             hazeSeconds--;
                                         }
                                         if (hazeSeconds <= 0) {
                                             clearInterval(hazeTime);
                                             $(".effects-container").find(".haze").remove();
                                             $(".container").css("opacity", 1);
                                             hazeCount = false;
                                             hazeEffect = false;
                                         }
                                         $(".haze").html("Haze: " + hazeSeconds + "s");
                                     },1000)
                                     break;
                                 case "glassCannon":
                                     if(glassCannonCount){
                                         clearInterval(glassCannonTime);
                                         $(".effects-container").find(".glassCannon").remove();
                                         glassCannonMultiplier = 1;
                                     }
                                     glassCannonCount = true;
                                     glassCannonMultiplier = 2;
                                     let glassSeconds = 15;
                                     $(".effects-container").append('<h4 class="glassCannon">Glass Cannon: 15s</h4>');
                                     glassCannonTime = setInterval(function() {
                                         if(!isPaused){
                                             glassSeconds--;
                                         }
                                         if (glassSeconds <= 0) {
                                             clearInterval(glassCannonTime);
                                             glassCannonMultiplier = 1;
                                             $(".effects-container").find(".glassCannon").remove();
                                             glassCannonCount = false;
                                         }
                                        $(".glassCannon").html("Glass Cannon: " + glassSeconds + "s");
                                     }, 1000);
                                     break;
                                 case "shrink":
                                     if(shrinkCount){
                                         clearInterval(shrinkTime);
                                         $(".main-grid-container-normal button, .main-grid-container-expert button, .main-grid-container-chaos button").css("scale", "1");
                                         $(".effects-container").find(".shrink").remove();
                                     }
                                     shrinkCount = true;
                                     $(".main-grid-container-normal button, .main-grid-container-expert button, .main-grid-container-chaos button").css("scale", "0.7");
                                     $(".effects-container").append('<h4 class="shrink">Shrink: 15s</h4>');
                                     let shrinkSeconds = 15;
                                     shrinkTime = setInterval(function() {
                                         if(!isPaused){
                                             shrinkSeconds--;
                                         }
                                         if (shrinkSeconds <= 0) {
                                             clearInterval(shrinkTime);
                                             $(".main-grid-container-normal button, .main-grid-container-expert button, .main-grid-container-chaos button").css("scale", "1");
                                             $(".effects-container").find(".shrink").remove();
                                             shrinkCount = false;
                                         }
                                         $(".shrink").html("Shrink: " + shrinkSeconds + "s");
                                     }, 1000);
                                     break;
                                 case "increasePoints":
                                     if(increasePointsCount){
                                         clearInterval(increasePointsTime);
                                         $(".effects-container").find(".increasePoints").remove();
                                         pointBonus = 0;
                                     }
                                     increasePointsCount = true;
                                     pointBonus = 3;
                                     $(".effects-container").append('<h4 class="increasePoints">Increase Points: 15s</h4>');
                                     let increasePointsSeconds = 15;
                                     increasePointsTime = setInterval(function() {
                                         if(!isPaused){
                                             increasePointsSeconds--;
                                         }
                                         if (increasePointsSeconds <= 0) {
                                             clearInterval(increasePointsTime);
                                             $(".effects-container").find(".increasePoints").remove();
                                             increasePointsCount = false;
                                             pointBonus = 0;
                                         }
                                         $(".increasePoints").html("Increase Points: " + increasePointsSeconds + "s");
                                     }, 1000);
                                     break;
                                 case "shield":
                                     if(shieldCount){
                                         clearInterval(shieldTime);
                                         $(".effects-container").find(".shield").remove();
                                         shieldProtection = 1;
                                     }
                                     shieldCount = true;
                                     shieldProtection = 0; // no health loss
                                     $(".effects-container").append('<h4 class="shield">Shield: 15s</h4>');
                                     let shieldSeconds = 15;
                                     shieldTime = setInterval(function() {
                                         if(!isPaused){
                                             shieldSeconds--;
                                         }
                                         if (shieldSeconds <= 0) {
                                             clearInterval(shieldTime);
                                             $(".effects-container").find(".shield").remove();
                                             shieldProtection = 1;
                                             shieldCount = false;
                                         }
                                         $(".shield").html("Shield: " + shieldSeconds + "s");
                                     }, 1000);
                                     break;
                             }
                         }
                     }
                     button.removeAttr('id').off("click"); // remove the attribute right after the button is clicked. (.off) will make it no longer responsive to prevent spamming
                     return; // exit the function early
                 }
                 $(this).removeAttr('id').off("click"); // remove the attribute right after the button is clicked. (.off) will make it no longer responsive to prevent spamming
                 // checks which square was clicked gives the appropriate score and health.
                 // Normal square clicking checks, variables from above will be used for score calculations.
                 switch(randomSquare) {
                     case "good1":
                         score += (1 + pointBonus) * glassCannonMultiplier; // no point reduction here because it would be zero.
                         if(health < maxHealth && (health + 0.5) < maxHealth){
                             health += 0.5 * chaosHealthMultiplier;
                         }
                         else{
                             health += (maxHealth - health);
                         }
                         clickSound.pause();
                         clickSound.currentTime = 0;
                         clickSound.play();
                         break;
                     case "good2":
                         score += (2 - pointReduction + pointBonus) * glassCannonMultiplier;
                         if(health < maxHealth && (health + 0.5) < maxHealth){
                             health += 0.5 * chaosHealthMultiplier;
                         }
                         else{
                             health += (maxHealth - health);
                         }                 
                         clickSound.pause();
                         clickSound.currentTime = 0;
                         clickSound.play();           
                         break;
                     case "good3":
                         score += (5 - pointReduction + pointBonus) * glassCannonMultiplier;
                         if(health < maxHealth && (health + 0.5) < maxHealth){
                             health += 0.5 * chaosHealthMultiplier;
                         }
                         else{
                             health += (maxHealth - health);
                         }
                         clickSound.pause();
                         clickSound.currentTime = 0;
                         clickSound.play();
                         break;  
                     case "good4":
                         score += (8 - pointReduction + pointBonus) * glassCannonMultiplier;
                         if(health < maxHealth && (health + 1) < maxHealth){
                             health += 1 * chaosHealthMultiplier;
                         }
                         else{
                             health += (maxHealth - health);
                         }
                         clickSound.pause();
                         clickSound.currentTime = 0;
                         clickSound.play();
                         break;
                     case "bad1":
                         score -= (3 + expertPenaltyPoints) * glassCannonMultiplier;
                         misses += (1 * accuracyPenaltyMultiplier);
                         health -= (5 + expertPenaltyHP) * glassCannonMultiplier * hpReductionMultiplier * shieldProtection;
                         errorSound.pause();
                         errorSound.currentTime = 0;
                         errorSound.play();
                         break;
                     case "bad2":
                         score -= (5 + expertPenaltyPoints) * glassCannonMultiplier;
                         misses += (1 * accuracyPenaltyMultiplier);
                         health -= (7 + expertPenaltyHP) * glassCannonMultiplier * hpReductionMultiplier * shieldProtection;
                         errorSound.pause();
                         errorSound.currentTime = 0;
                         errorSound.play();
                         break;
                     case "bad3":
                         score -= (10 + expertPenaltyPoints) * glassCannonMultiplier;
                         misses += (1 * accuracyPenaltyMultiplier);
                         health -= (10 + expertPenaltyHP) * glassCannonMultiplier * hpReductionMultiplier * shieldProtection;
                         errorSound.pause();
                         errorSound.currentTime = 0;
                         errorSound.play();
                         break;
                     case "mystery":
                         let randomScore = Math.floor(Math.random() * 31) - 15; // random number between -15 and 15
                         let randomHealth = Math.floor(Math.random() * 8) - 5; // random number between -5 and 2
                         score += randomScore + pointBonus;
                         health += randomHealth * shieldProtection;
                         if(health < maxHealth && (health + randomHealth) < maxHealth){
                             health += randomHealth;
                         }
                         else{
                             health += (maxHealth - health);
                         }
                         clickSound.pause();
                         clickSound.currentTime = 0;
                         clickSound.play();
                         break;
                 }
                 totalCount++;
                 // If user health drops to zero or below, end game
                 if(health <= 0){
                    gameOver();
                    return;
                 }
                 // Accuracy calculation here
                 accuracy = ((totalCount - misses) / totalCount * 100).toFixed(2);
                    // There will be no negative accuracy so it will be replaced by 0.01
                 if(accuracy < 0){
                     accuracy = 0.01;
                 }
                 // Updating the statistics container for the user to see.
                 $(".score").html('<h4>Score: <span style="color:#2eb8b5">' + score + '</span></h4>');
                 $(".acc").html('<h4>Accuracy: <span style="color:#429820">' + accuracy + '%</span></h4>');
                 $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1) + ' HP</span></h4>');
             });
 
             // Fade out the buttons after a certain set amount of time, making time for the user to react and click to them
             delay = setTimeout(function(){
                 // If a good button was not clicked before this timeout function occurs, health will be reduced and so as accuracy.
                 if (button.attr('id') && button.attr('id').includes('good') && !isPaused) {
                     health -= 3 * hpReductionMultiplier * shieldProtection;
                     totalCount++;
                     misses += 1
                     if (health <= 0) {
                        gameOver();
                        return;
                    }
                     // Accuracy calculation here
                     accuracy = ((totalCount - misses) / totalCount * 100).toFixed(2);
                     // There will be no negative accuracy so it will be replaced by 0.01
                     if(accuracy < 0){
                         accuracy = 0.01;
                     }
                     // Updating information again
                     $(".hp").html('<h4>Health: <span style="color:#ec4048"> ' + health.toFixed(1) + ' HP</span></h4>');
                     $(".acc").html('<h4>Accuracy: <span style="color:#429820">' + accuracy + '%</span></h4>');
                 }
                 button.removeAttr('id').off("click"); // prevent clicking using .off
             }, (cycleTime - 1000));
          }
     }
});