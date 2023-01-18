// https://adventofcode.com/2022/day/18/input

// 1
((
  drop = Object.fromEntries(
    [...document.body.innerText.matchAll(/^(\d+),(\d+),(\d+)$/gm)].map(
      ([k, ...ns]) => [k, ns.map((n) => parseInt(n))],
    ),
  ),
  sides = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
  ],
) =>
  Object.values(drop).reduce(
    (surface, coord) =>
      surface +
      sides.filter(
        (delta) => !drop[delta.map((_, i) => delta[i] + coord[i]).join()],
      ).length,
    0,
  ))();

// 2
((
  drop = Object.fromEntries(
    [...document.body.innerText.matchAll(/^(\d+),(\d+),(\d+)$/gm)].map(
      ([k, ...ns]) => [k, ns.map((n) => parseInt(n))],
    ),
  ),
  sides = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
  ],
  max = Object.values(drop).reduce((max, cur) => Math.max(max, ...cur), 0),
  access = { ...drop },
  water = (coord = [0, 0, 0]) =>
    coord.every((v) => v >= 0 && v <= max + 1) &&
    !access[coord.join()] &&
    (access[coord.join()] = "W") &&
    sides.map((delta) => water(delta.map((v, i) => v + coord[i]))),
) =>
  water() &&
  Object.values(drop).reduce(
    (surface, coord) =>
      surface +
      sides
        .map((delta) => delta.map((v, i) => v + coord[i]).join())
        .filter((next) => access[next] == "W" || next.includes("-")).length,
    0,
  ))();
