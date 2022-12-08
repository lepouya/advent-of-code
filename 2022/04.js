// https://adventofcode.com/2022/day/4/input

// 1
document.body.innerText.split("\n").filter(l=>!!l).map(l=>l.split(/[-,]/g).filter(n=>!isNaN(n)).map(n=>parseInt(n))).filter(([a1,a2,b1,b2]) => (a1<=b1&&a2>=b2)||(a1>=b1&&a2<=b2)).length

// 2
document.body.innerText.split("\n").filter(l=>!!l).map(l=>l.split(/[-,]/g).filter(n=>!isNaN(n)).map(n=>parseInt(n))).filter(([a1,a2,b1,b2]) => Math.max(a1,b1)<=Math.min(a2,b2)).length
