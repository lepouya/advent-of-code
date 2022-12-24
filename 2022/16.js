// https://adventofcode.com/2022/day/16/input

// 1
((graph) => graph["AA"].dfs(graph))(
  Object.fromEntries(
    [
      ...document.body.innerText.matchAll(
        /^.*([A-Z]{2}).*=(\d+);[^,\n]*(([A-Z]{2}[, ]*)+)$/gm,
      ),
    ].map(([_, valve, flow, tunnels]) => [
      valve,
      {
        flow: parseInt(flow) || 0,
        tunnels: [
          ...(flow > 0 ? ["+" + valve] : []),
          ...tunnels.split(/[, ]+/g),
        ],
        dfs: (graph, prev = { path: [valve], score: 0 }) =>
          graph[valve].tunnels
            .map((next) => ({
              next,
              seen: prev.path.lastIndexOf(next),
              path: [...prev.path, next],
              score:
                prev.score +
                ((30 - prev.path.length) * graph[next.substring(1)]?.flow || 0),
            }))
            .filter(
              (move) =>
                move.seen < 0 ||
                (move.next[0] != "+" &&
                  prev.path.some((s, i) => i > move.seen && s[0] == "+")),
            )
            .reduce(
              (best, cur) =>
                ((move) => (move.score > best.score ? move : best))(
                  cur.path.length >= 20
                    ? cur
                    : graph[cur.next.replace("+", "")].dfs(graph, cur),
                ),
              prev,
            ),
      },
    ]),
  ),
).score

// 2
