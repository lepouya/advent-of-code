// https://adventofcode.com/2022/day/13/input

// 1
document.body.innerText.split("\n").reduce((p,e,i) => p[(i%3==0?p.push([]):p.length)-1].push(e&&JSON.parse(e))&&p, []).reduce(({sum,lt},[a,b],i) => ({sum:sum+(lt(a,b)<0?i+1:0),lt}), {sum:0, lt:(a,b) => !isNaN(a)&&!isNaN(b)?Math.sign(a-b):!Array.isArray(a)?lt([a],b):!Array.isArray(b)?lt(a,[b]):a.length==0?-1:b.length==0?1:lt(a[0],b[0])==0?lt(a.slice(1),b.slice(1)):lt(a[0],b[0])}).sum

// 2
`[[2]]\n[[6]]\n${document.body.innerText}`.split("\n").filter(l=>l).map(JSON.parse).sort(function lt(a,b) { return !isNaN(a)&&!isNaN(b)?Math.sign(a-b):!Array.isArray(a)?lt([a],b):!Array.isArray(b)?lt(a,[b]):a.length==0?-1:b.length==0?1:lt(a[0],b[0])==0?lt(a.slice(1),b.slice(1)):lt(a[0],b[0]); }).map(l=>JSON.stringify(l)).reduce((p,l,i) => l=="[[2]]"||l=="[[6]]"?p*(i+1):p, 1)
 
