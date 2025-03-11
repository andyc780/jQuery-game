let array = [1,2,3,4,5,6,7,8,9,10];
// excludes index 0 and 1
for(let i = 0; i < 100; i++) {
    let randomize = array[Math.floor(Math.random() * (array.length - 2)) + 2];
    console.log(randomize);
}