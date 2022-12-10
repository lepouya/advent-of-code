// https://adventofcode.com/2022/day/10/input

// 1
document.body.innerText.split(/\s+/mg).map(v=>parseInt(v)||0).reduce((s,c)=>[...s,c+s.pop()],[1]).map((s,i)=>s*(i+1)).filter((_,i)=>(i-19)%40==0).reduce((a,c)=>a+c) 

// 2
document.body.innerText.split(/\s+/mg).map(v=>parseInt(v)||0).reduce((s,c)=>[...s,c+s.pop()],[1]).reduce((s,p,i)=>s+(i%40==0?"\n":"")+((p-i%40)**2<=1?"#":"."),"") 
