// https://adventofcode.com/2022/day/6/input

// 1
Array.from(document.body.innerText).reduce((a,_,i,s) => a || (i>=3 && s.slice(i-3,i+1).filter((c,i,s) => i==s.indexOf(c)).length == 4 ? i+1 : 0), 0)

// 2
Array.from(document.body.innerText).reduce((a,_,i,s) => a || (i>=13 && s.slice(i-13,i+1).filter((c,i,s) => i==s.indexOf(c)).length == 14 ? i+1 : 0), 0)
