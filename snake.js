const root = document.getElementById("root");

//* change element color in matrix
const color = (i, j, c) => {
  console.log(root.children);
  root.children[i].children[j].style.backgroundColor = c;
};

//* Returns True o False if exists x and y in locs of snake
const isInSnake = (x, y) => s.locs.some((l) => l[0] === x && l[1] === y);

//* Object Snake
const newS = () => ({
  locs: [[n / 2, n / 2]],
  food: null,
  tdir: 0,
  dir: 0,
  timeout: 0,
});
let n = 20,
  s;

//todo: Disable key 'enter' once started game

document.onkeydown = ({ keyCode: k }) => {
  if (k === 13) {
    root.innerHTML = Array(n)
      .fill("<div>" + Array(n).fill("<div></div>").join("") + "</div>")
      .join("");
    if (s) clearTimeout(s.timeout);
    s = newS();
    gameLoop();
  }
  if (k > 36 && k < 41 && s.dir % 2 == k % 2) s.tdir = k - 37;
};
const gameLoop = () => {
  //* Set Score
  document.getElementById("score").textContent = s.locs.length - 1;
  s.dir = s.tdir;

  //* Generate Random Food
  //! Dangerous with loop infinite
  while (!s.food || isInSnake(...s.food))
    s.food = [0, 0].map(() => Math.floor(Math.random() * n));
  color(...s.food, "#eee");

  const [x, y] = s.locs[0].map((n, i) =>
    s.dir % 2 !== i ? n + s.dir + i - 2 : n
  );

  //* Here when snake eat food set to null
  if ([x, y].every((n, i) => n === s.food[i])) {
    s.food = null;
  }
  //
  else if (Math.min(x, y) < 0 || Math.max(x, y) >= n || isInSnake(x, y)) {
    return;
  } else {
    color(...s.locs.pop(), "#333");
  }
  s.locs.unshift([x, y]);
  color(x, y, "#5a7");
  s.timeout = setTimeout(gameLoop, 250);
};
