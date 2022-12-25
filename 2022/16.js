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
        dfs: (
          graph,
          prev = { path: [valve], score: 0 },
          high = [
            0,
            Object.values(graph).reduce((sum, { flow }) => sum + flow, 0),
          ],
        ) =>
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
                (!move.next.includes("+") &&
                  prev.path.some((s, i) => i > move.seen && s.includes("+"))),
            )
            .filter(
              (move) =>
                ((high[0] = Math.max(high[0], move.score)) - move.score) /
                  (30 - move.path.length) <=
                high[1] / 2,
            )
            .map((move) =>
              move.path.length >= 30
                ? move
                : graph[move.next.replace("+", "")].dfs(graph, move, high),
            )
            .reduce((best, cur) => (cur.score > best.score ? cur : best), prev),
      },
    ]),
  ),
).score;

// 2
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
        dfs: (
          graph,
          prev = { paths: [[valve], [valve]], score: 0 },
          high = [
            0,
            Object.values(graph).reduce((sum, { flow }) => sum + flow, 0),
          ],
          turn = prev.paths[0].length <= prev.paths[1].length ? 0 : 1,
          path = prev.paths[turn],
        ) =>
          graph[path[path.length - 1].replace("+", "")].tunnels
            .map((next) => ({
              next,
              seen: next.includes("+")
                ? prev.paths.some((p) => p.includes(next)) - 1
                : path.lastIndexOf(next),
              paths: [
                turn == 0 ? [...path, next] : prev.paths[0],
                turn == 1 ? [...path, next] : prev.paths[1],
              ],
              score:
                prev.score +
                ((26 - path.length) * graph[next.substring(1)]?.flow || 0),
            }))
            .filter(
              (move) =>
                move.seen < 0 ||
                (!move.next.includes("+") &&
                  path.some((s, i) => i > move.seen && s.includes("+"))),
            )
            .filter(
              (move) =>
                ((high[0] = Math.max(high[0], move.score)) - move.score) /
                  (26 - move.paths[turn].length) <=
                high[1] / 2,
            )
            .map((move) =>
              move.paths[turn].length >= 26
                ? move
                : graph[move.next.replace("+", "")].dfs(graph, move, high),
            )
            .reduce((best, cur) => (cur.score > best.score ? cur : best), prev),
      },
    ]),
  ),
).score;
