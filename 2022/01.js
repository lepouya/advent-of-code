// To run on web console for input file: https://adventofcode.com/2022/day/1/input

// Part 1
document.body.innerText.split("\n\n").map(elf => elf.split("\n").map(w => parseInt(w)).filter(w => !isNaN(w)).reduce((a,c) => a+c, 0)).reduce((a,c) => Math.max(a,c), 0)

// Part 2
document.body.innerText.split("\n\n").map(elf => elf.split("\n").map(w => parseInt(w)).filter(w => !isNaN(w)).reduce((a,c) => a+c, 0)).sort((a,b) => b-a).splice(0, 3).reduce((a,c) => a+c, 0)
