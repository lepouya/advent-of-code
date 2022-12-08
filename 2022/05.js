// https://adventofcode.com/2022/day/5/input

// 1
document.body.innerText.split("\n").map(l => /^(?:\W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W)|(?:\D+(\d+)\D+(\d+)\D+(\d+))$/.exec(l)?.slice(1).map(s => !!s && !!s.trim()?isNaN(s)?s:parseInt(s):null)).filter(l=>!!l).reduce((a,l) => l.reduce((a,c,i,l) => ((!c||i>9)?a:(i<9)?a[i].push(c):[...Array(c).keys()].map(_=>a[l[11]-1].unshift(a[l[10]-1].shift())))&& a, a), Array(9).fill().map(_=>[])).map(l=>l.shift()).join("")

// 2
document.body.innerText.split("\n").map(l => /^(?:\W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W \W(\D)\W)|(?:\D+(\d+)\D+(\d+)\D+(\d+))$/.exec(l)?.slice(1).map(s => !!s && !!s.trim()?isNaN(s)?s:parseInt(s):null)).filter(l=>!!l).reduce((a,l) => l.reduce((a,c,i,l) => ((!c||i>9)?a:(i<9)?a[i].push(c):a[l[11]-1].splice(0,0,...a[l[10]-1].splice(0,c)))&& a, a), Array(9).fill().map(_=>[])).map(l=>l.shift()).join("")
