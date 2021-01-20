let oddId = [];
let evenId = [];
let i = 1;
while (i <= 100) {
    if (i % 2 !== 0) {
        oddId.push(i)
     } else {
        evenId.push(i)
    }
    i++;
}

console.log(oddId);
console.log(evenId);