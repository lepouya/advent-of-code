// https://adventofcode.com/2022/day/8/input

// 1
document.body.innerText.split("\n").filter(l=>l).map(l=>l.split("").filter(n=>!isNaN(n)).map(n=>parseInt(n))).map((r,x,g) => r.map((h,y) => r.some((t,i)=>i<y&&t>=h) && r.some((t,i)=>i>y&&t>=h) && g.some((ts,i)=>i<x&&ts[y]>=h) && g.some((ts,i)=>i>x&&ts[y]>=h))).flat().filter(v=>!v).length

// 2
document.body.innerText.split("\n").filter(l=>l).map(l=>l.split("").map(n=>parseInt(n))).map((r,x,g) => r.map((h,y) => (y-Math.max(0,r.findLastIndex((t,i)=>i<y&&t>=h))) * ((r.findIndex((t,i)=>i>y&&t>=h)+r.length)%r.length-y) * (x-Math.max(0,g.findLastIndex((ts,i)=>i<x&&ts[y]>=h))) * ((g.findIndex((ts,i)=>i>x&&ts[y]>=h)+g.length)%g.length-x))).flat().reduce((a,c)=>Math.max(a,c))
