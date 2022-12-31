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
