// https://adventofcode.com/2022/day/12/input

// 1
((puzzle) => [...Array(puzzle.map.length*puzzle.map[0].length)].every(_=>puzzle.map.reduce((more,row,x) => row.reduce((more,cell,y)=>[[x>0?-1:0,0],[x<puzzle.map.length-1?1:0,0],[0,y>0?-1:0],[0,y<row.length-1?1:0]].reduce((more,[dx,dy]) => (cell.height-puzzle.map[x+dx][y+dy].height <=1 && puzzle.map[x+dx][y+dy].steps+1 < cell.steps && (cell.steps = puzzle.map[x+dx][y+dy].steps+1))||more,false)||more,false)||more,false))||puzzle.map[puzzle.end[0]][puzzle.end[1]].steps)(document.body.innerText.split("\n").filter(l=>l).reduce((p,l,x) => p.map.push(l.split("").reduce((l,c,y) => [...l, c=='S'?(p.start=[x,y])&&{height:1,steps:0}:c=='E'?(p.end=[x,y])&&{height:26,steps:Infinity}:{height:c.charCodeAt()-96,steps:Infinity}], []))&&p, {map:[],start:[0,0],end:[0,0]}))

// 2
((puzzle) => [...Array(puzzle.map.length*puzzle.map[0].length)].every(_=>puzzle.map.reduce((more,row,x) => row.reduce((more,cell,y)=>[[x>0?-1:0,0],[x<puzzle.map.length-1?1:0,0],[0,y>0?-1:0],[0,y<row.length-1?1:0]].reduce((more,[dx,dy]) => (cell.height-puzzle.map[x+dx][y+dy].height <=1 && puzzle.map[x+dx][y+dy].steps+1 < cell.steps && (cell.steps = puzzle.map[x+dx][y+dy].steps+1))||more,false)||more,false)||more,false))||puzzle.map[puzzle.end[0]][puzzle.end[1]].steps)(document.body.innerText.split("\n").filter(l=>l).reduce((p,l,x) => p.map.push(l.split("").reduce((l,c,y) => [...l, c=='S'?(p.start=[x,y])&&{height:1,steps:0}:c=='E'?(p.end=[x,y])&&{height:26,steps:Infinity}:{height:c.charCodeAt()-96,steps:c=='a'?0:Infinity}], []))&&p, {map:[],start:[0,0],end:[0,0]})) 
