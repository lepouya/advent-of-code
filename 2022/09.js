// https://adventofcode.com/2022/day/9/input

// 1
Object.keys(document.body.innerText.split("\n").map(l=>l.split(" ")).reduce((s,[d,n]) => [...s,...Array(parseInt(n)||1).fill([d=="R"?1:d=="L"?-1:0,d=="U"?1:d=="D"?-1:0])], []).reduce(({H:[Hx,Hy],T:[Tx,Ty],Tv,d},[x,y]) => ({H:[Hx+x,Hy+y],T:[Tx+d(Hx+x-Tx,d(Hy+y-Ty)),Ty+d(Hy+y-Ty,d(Hx+x-Tx))],Tv:(Tv[`${Tx},${Ty}`]=1)&&Tv,d}), {H:[0,0],T:[0,0],Tv:{},d:(n,x)=>Math.trunc(n/(2-Math.abs(x||0)))}).Tv).length 

// 2
new Set(document.body.innerText.split("\n").map(l=>l.split(" ")).reduce((s,[d,n]) => [...s,...Array(parseInt(n)||1).fill([d=="R"?1:d=="L"?-1:0,d=="U"?1:d=="D"?-1:0])], []).reduce(({ks,d},[dx,dy]) => ({ks:ks.reduce((a,{x,y,v},i) => [...a, {x:x+(i?d(a[i-1].x-x,d(a[i-1].y-y)):dx), y:y+(i?d(a[i-1].y-y,d(a[i-1].x-x)):dy), v:[...v,`${x},${y}`]}], []),d}), {ks:Array(10).fill({x:0,y:0,v:[]}),d:(n,x)=>Math.sign(Math.trunc(n/(2-Math.abs(x||0))))}).ks.pop().v).size
