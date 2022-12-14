// https://adventofcode.com/2022/day/14/input

// 1
((cave) => [...Array(999*999).keys()].every(_=>isFinite(cave.drop(cave)?.y))||cave)(document.body.innerText.split("\n").map(line=>[...line.matchAll(/\b(\d+),(\d+)\b/g)].map(([_,x,y])=>({x:parseInt(x),y:parseInt(y)}))).reduce((cave,lines) => lines.reduce((cave,line,i) => cave.put(cave,line,lines[i-1]), cave), {put: (cave,p1,p2=p1,v="#") => [...Array(Math.max(p1.y,p2.y)+1).keys()].slice(Math.min(p1.y,p2.y)).reduce((_,y) => [...Array(Math.max(p1.x,p2.x)+1).keys()].slice(Math.min(p1.x,p2.x)).reduce((_,x) => (cave[y]||={})&&(cave[y][x]=v)&&(cave.height=Math.max(y,cave.height??1))&&(cave[v]=(cave[v]??0)+1)&&cave, cave), cave), drop: (cave,{x,y}={x:500,y:0},v="o") => y>cave.height?{x,y:Infinity}:(cave[y]??{})[x]?null:(cave.drop(cave,{x,y:y+1},v) || cave.drop(cave,{x:x-1,y:y+1},v) || cave.drop(cave,{x:x+1,y:y+1},v) || (cave.put(cave,{x,y},undefined,v) && {x,y}))}))["o"] 

// 2
