// Input file: https://adventofcode.com/2022/day/2/input

// Pt 1
document.body.innerText.split("\n").filter(l => !!l).map(l => l.split(' ').map(p => "ABCXYZ".indexOf(p.toUpperCase())%3)).map(([a,b]) => (b-a+4)%3*3 + b+1).reduce((a,c) => a+c, 0)

// Pt 2
document.body.innerText.split("\n").filter(l => !!l).map(l => l.split(' ').map(p => "ABCXYZ".indexOf(p.toUpperCase())%3)).map(([a,r]) => r*3 + (a+r+2)%3+1).reduce((a,c) => a+c, 0)
