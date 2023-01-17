// https://adventofcode.com/2022/day/17/input

// 1
((
  cave = {
    wind: document.body.innerText.trim(),
    count: 2022,
    rocks: [
      [0b11110000],
      [0b01000000, 0b11100000, 0b01000000],
      [0b00100000, 0b00100000, 0b11100000],
      [0b10000000, 0b10000000, 0b10000000, 0b10000000],
      [0b11000000, 0b11000000],
    ],
    wall: 0b100000001,
    tower: [0b111111111],
    travel: { rock: 0, wind: 0 },
    shift: (rock, dir, pos) =>
      rock.reduce(
        (dest, line, i) =>
          (line >> dest.col) & (cave.tower[dest.row + i] ?? cave.wall)
            ? { ...pos, blocked: true }
            : dest,
        {
          row: pos.row + (dir == "v" ? 1 : 0),
          col: pos.col + (dir == ">" ? 1 : dir == "<" && pos.col > 0 ? -1 : 0),
          blocked: false,
        },
      ),
    place: (rock, { row, col }) =>
      row < 0
        ? cave.tower.unshift(cave.wall) &&
          cave.place(rock, { row: row + 1, col })
        : rock.reduce((_, line, i) => (cave.tower[row + i] |= line >> col), 0),
    drop: (
      rock = cave.rocks[cave.travel.rock++ % cave.rocks.length],
      pos = { row: -3 - rock.length, col: 2 },
      wind = cave.wind[cave.travel.wind++ % cave.wind.length],
      dest = cave.shift(rock, "v", cave.shift(rock, wind, pos)),
    ) => (dest.blocked ? cave.place(rock, dest) : cave.drop(rock, dest)),
  },
) => [...Array(cave.count)].map((_) => cave.drop()) && cave)().tower.length - 1;

// 2
((
  cave = {
    wind: document.body.innerText.trim(),
    count: 1000000000000,
    rocks: [
      [0b11110000],
      [0b01000000, 0b11100000, 0b01000000],
      [0b00100000, 0b00100000, 0b11100000],
      [0b10000000, 0b10000000, 0b10000000, 0b10000000],
      [0b11000000, 0b11000000],
    ],
    wall: 0b100000001,
    tower: [0b111111111],
    placed: [],
    travel: { rocks: 0, winds: 0, height: 0 },
    shift: (rock, dir, pos) =>
      rock.reduce(
        (dest, line, i) =>
          (line >> dest.col) & (cave.tower[dest.row + i] ?? cave.wall)
            ? { ...pos, blocked: true }
            : dest,
        {
          row: pos.row + (dir == "v" ? 1 : 0),
          col: pos.col + (dir == ">" ? 1 : dir == "<" && pos.col > 0 ? -1 : 0),
          blocked: false,
        },
      ),
    place: (rock, { row, col }) =>
      row < 0
        ? cave.tower.unshift(cave.wall) &&
          ++cave.travel.height &&
          cave.place(rock, { row: row + 1, col })
        : rock.reduce(
            (_, line, i) => (cave.tower[row + i] |= line >> col),
            cave.placed.push({
              ...cave.travel,
              row,
              col,
              rock: (cave.travel.rocks - 1) % cave.rocks.length,
              wind: (cave.travel.winds - 1) % cave.wind.length,
            }),
          ),
    drop: (
      rock = cave.rocks[cave.travel.rocks++ % cave.rocks.length],
      pos = { row: -3 - rock.length, col: 2 },
      wind = cave.wind[cave.travel.winds++ % cave.wind.length],
      dest = cave.shift(rock, "v", cave.shift(rock, wind, pos)),
    ) => (dest.blocked ? cave.place(rock, dest) : cave.drop(rock, dest)),
  },
  tower = [...Array(cave.rocks.length * cave.wind.length)].reduce(
    () => cave.drop() && cave.placed,
    null,
  ),
  last = tower[tower.length - 1],
  cycle = tower.filter(
    (place) =>
      place.rock == last.rock &&
      place.wind == last.wind &&
      place.row == last.row &&
      place.col == last.col,
  ),
  diff = cycle
    .slice(0, 2)
    .reduce((p1, p2) =>
      Object.fromEntries(Object.entries(p2).map(([k, v]) => [k, v - p1[k]])),
    ),
) =>
  cave.count <= tower.length
    ? tower[cave.count - 1].height
    : tower[((cave.count - cycle[0].rocks) % diff.rocks) + cycle[0].rocks - 1]
        .height +
      Math.floor((cave.count - cycle[0].rocks) / diff.rocks) * diff.height)();
