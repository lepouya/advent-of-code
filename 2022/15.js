// https://adventofcode.com/2022/day/15/input

// 1
((tunnels)=>(y)=>[...Array(tunnels.bounds.right-tunnels.bounds.left+1).keys()].reduce((cover,x)=>cover+(tunnels.beacons.every(({x:bx,y:by})=>x+tunnels.bounds.left!=bx||y!=by) && tunnels.sensors.find(({x:sx,y:sy,r})=>r>=Math.abs(x+tunnels.bounds.left-sx)+Math.abs(y-sy))?1:0), 0))([...document.body.innerText.matchAll(/^.+?(-?\d+).+?(-?\d+).+?(-?\d+).+?(-?\d+)$/gm)].map(l=>[...l.map(c=>parseInt(c)),Math.abs(l[1]-l[3])+Math.abs(l[2]-l[4])]).reduce(({sensors,beacons,bounds},[_,sx,sy,bx,by,r])=> ({sensors:[...sensors,{x:sx,y:sy,r}], beacons:[...beacons,{x:bx,y:by}], bounds:{left:Math.min(bounds.left??sx,sx-r), right:Math.max(bounds.right??sx,sx+r), top:Math.min(bounds.top??sy,sy-r), bottom:Math.max(bounds.bottom??sy,sy+r)}}), {sensors:[],beacons:[],bounds:{}}))(2000000) 

// 2
// incomplete
(
  ({ sensors, union }) =>
  (size) =>
    [...Array(size + 1).keys()]
      .map((row) => [
        row,
        sensors
          .flatMap(({ x, y, r }) =>
            Math.abs(y - row) > r
              ? []
              : [[x - r + Math.abs(y - row), x + r - Math.abs(y - row)]],
          )
          .reduce((ints, adding) => union(adding, ...ints), []),
      ])
      .filter(
        ([_, ints]) => ints.length != 1 || ints[0][0] > 0 || ints[0][1] < size,
      )
      .map(([y, ints]) => [
        y,
        ints.reduce(
          ([s1, e1], [s2, e2]) => [
            s2 < s1 ? e2 + 1 : s1,
            e2 > e1 ? s2 - 1 : e1,
          ],
          [0, size],
        ),
      ])
      .filter(([_, [s, e]]) => s <= e)
      .map(([y, [x]]) => x * size + y)
      .shift()
)(
  [
    ...document.body.innerText.matchAll(
      /^.+?(-?\d+).+?(-?\d+).+?(-?\d+).+?(-?\d+)$/gm,
    ),
  ]
    .map((l) => [
      ...l.map((c) => parseInt(c)),
      Math.abs(l[1] - l[3]) + Math.abs(l[2] - l[4]),
    ])
    .reduce(
      ({ sensors, beacons, bounds, ...fns }, [_, sx, sy, bx, by, r]) => ({
        sensors: [...sensors, { x: sx, y: sy, r }],
        beacons: [...beacons, { x: bx, y: by }],
        bounds: {
          left: Math.min(bounds.left ?? sx, sx - r),
          right: Math.max(bounds.right ?? sx, sx + r),
          top: Math.min(bounds.top ?? sy, sy - r),
          bottom: Math.max(bounds.bottom ?? sy, sy + r),
        },
        ...fns,
      }),
      {
        sensors: [],
        beacons: [],
        bounds: {},
        union: (...ints) =>
          ints
            .reduce(
              (ints, xs) =>
                ints.push(
                  ints.reduce(
                    (adding, current) =>
                      Math.max(current[0], adding[0]) <=
                      Math.min(current[1], adding[1]) + 1
                        ? current.splice(
                            0,
                            2,
                            Math.min(current[0], adding[0]),
                            Math.max(current[1], adding[1]),
                          ) && []
                        : adding,
                    xs,
                  ),
                ) && ints,
              [],
            )
            .filter((i) => i && !isNaN(i[0])),
      },
    ),
)(4000000)

