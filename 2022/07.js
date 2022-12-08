// https://adventofcode.com/2022/day/7/input

// 1
Object.values([...document.body.innerText.matchAll(/^(?:\$ (\S+) ?(\S*))|(?:(\S+) (\S+))$/mg)].reduce(({fs,wd},[_,cmd,arg,sz,fn]) => cmd=="cd"?{fs,wd:arg=='/'?[]:arg=='..'?wd.slice(0,-1):[...wd,arg]}:fn?{fs:[...wd,fn].reduce((wd,fn)=>(fs[wd]=(fs[wd]||0)+(parseInt(sz)||0))+1&&(wd+fn+"/"),"/")&&fs,wd}:{fs,wd}, {fs:{},wd:[]}).fs).filter(z=>z<=1e5).reduce((a,c)=>a+c,0)

// 2
Object.values([...document.body.innerText.matchAll(/^(?:\$ (\S+) ?(\S*))|(?:(\S+) (\S+))$/mg)].reduce(({fs,wd},[_,cmd,arg,sz,fn]) => cmd=="cd"?{fs,wd:arg=='/'?[]:arg=='..'?wd.slice(0,-1):[...wd,arg]}:fn?{fs:[...wd,fn].reduce((wd,fn)=>(fs[wd]=(fs[wd]||0)+(parseInt(sz)||0))+1&&(wd+fn+"/"),"/")&&fs,wd}:{fs,wd}, {fs:{},wd:[]}).fs).filter((z,_,[tot])=>tot-z<=4e7).sort((a,b)=>a-b)[0]
