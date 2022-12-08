// https://adventofcode.com/2022/day/3/input

// 1
document.body.innerText.split("\n").filter(l => !!l).map(r => Array.from(r.substring(0,r.length/2)).filter(c => r.substring(r.length/2).includes(c)).pop()).map(c => (c.charCodeAt()-38)%58).reduce((a,c) => a+c, 0)

// 2
document.body.innerText.split("\n").filter(l => !!l).reduce((a,c,i) => [...a.slice(0,a.length-Math.sign(i%3)), i%3===0 ? Array.from(c) : a.pop().filter(e => c.includes(e))], []).map(c => (c.pop().charCodeAt()-38)%58).reduce((a,c) => a+c, 0)
