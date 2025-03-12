// let array = [1,2,3,4,5,6,7,8,9,10];
// // excludes index 0 and 1
// for(let i = 0; i < 100; i++) {
//     let randomize = array[Math.floor(Math.random() * (array.length - 2)) + 2];
//     console.log(randomize);
// }

// for(let i = 0; i < 100; i++){
//     let random = Math.floor(Math.random() * 5) + 1;
//     if(random == 5){
//         console.log("Hit");
//     }
// }
let randomEffects = [
    "speedUp",
    "speedDown",
    "haze",
    "glassCannon",
    "shrink",
    "expand",
]
for(let i = 0; i < 100; i++){
    let chance = Math.floor(Math.random() * 25) + 1;
    if(chance == 5){
        // cycleButtonAmount--; // decrement total buttons by 1 for room.
        let selectEffect = randomEffects[Math.floor(Math.random() * randomEffects.length)];
        console.log(selectEffect);
    
    }
}