let oddId = [];
let evenId = [];

for (let i = 1; i <= 100; i++) {
    if (i % 2 !== 0) {
        oddId.push(i)
     } else {
        evenId.push(i)
    }
}

console.log(oddId.length);
console.log(evenId.length);