const root = document.getElementById("root");

let snake;
let food;
let score = 0;

const Board = {
  rows: 20,
  cols: 30,
};

const generateBoard = (parent) => {
  for (let i = 0; i < Board.rows; i++) {
    let row = document.createElement("div");
    for (let i = 0; i < Board.cols; i++) {
      let col = document.createElement("div");
      row.appendChild(col);
    }
    parent.appendChild(row);
  }
  return parent;
};

const Snake = () => ({
  position: [[Board.rows / 2 - 1, Board.cols / 2 - 1]],
  direction: KEYS.ArrowLeft().direction,
  timeout: 0,
});

const Food = () => ({
  position: [
    Math.floor(Math.random() * Board.rows),
    Math.floor(Math.random() * Board.cols),
  ],
  color: "#eee",
});

const isOutLimits = (x, y) => {
  if (
    root.children[y] === undefined ||
    root.children[y].children[x] === undefined
  )
    return true;

  return false;
};

const setColor = (p, c) => {
  if (isOutLimits(...p)) return;
  root.children[p[1]].children[p[0]].style.backgroundColor = c;
};

const setScore = (point = 0) => {
  score += point;
  document.getElementById("score").innerHTML = score;
};
const isInSnake = (snake, food) =>
  snake.some((s) => s[0] === food[0] && s[1] === food[1]);

const COLOR = {
  snake: "#5a7",
  board: "#333",
  food: "#eee",
};

const KEYS = {
  ArrowLeft: (x = 0, y = 0) => ({
    direction: "ArrowLeft",
    block: "ArrowRight",
    position: [x - 1, y],
  }),
  ArrowRight: (x = 0, y = 0) => ({
    direction: "ArrowRight",
    block: "ArrowLeft",
    position: [x + 1, y],
  }),
  ArrowUp: (x = 0, y = 0) => ({
    direction: "ArrowUp",
    block: "ArrowDown",
    position: [x, y - 1],
  }),
  ArrowDown: (x = 0, y = 0) => ({
    direction: "ArrowDown",
    block: "ArrowUp",
    position: [x, y + 1],
  }),
};

const startGame = () => {
  if (!snake && !food) {
    snake = Snake();
    food = Food();
    setColor(snake.position[0], COLOR.snake);
    setColor(food.position, COLOR.food);
    setScore();
  }

  if (isInSnake(snake.position, food.position)) {
    console.log("Eating...");
    snake.position.unshift(food.position);
    //*Refactor
    setColor(snake.position[0], COLOR.snake);
    setScore(1);
    food = Food();
    setColor(food.position, COLOR.food);
  }
  if (isOutLimits(...snake.position[0])) return;

  if (Object.keys(KEYS).includes(snake.direction)) {
    let newPosition = snake.position
      .map((p, i) => {
        setColor(p, COLOR.board);
        if (i === 0) {
          p = KEYS[snake.direction](...p).position;
          return p;
        } else if (i > 0 && i < snake.position.length - 1) {
          p = snake.position[i - 1];
          return p;
        } else if (snake.position.length - 1 === i) {
          p = snake.position[snake.position.length - 2];
          return p;
        }
      })
      .map((n) => {
        setColor(n, COLOR.snake);
        return n;
      });
    snake.position = newPosition;
  }

  snake.timeout = setTimeout(startGame, 200);
};

document.onkeydown = ({ key }) => {
  if ("Enter" === key) {
    generateBoard(root);
    if (snake) clearTimeout(snake.timeout);
    startGame();
  } else if (Object.keys(KEYS).includes(key)) {
    if (key !== KEYS[snake.direction]().block) {
      snake.direction = KEYS[key]().direction;
    }
  }
};
/*
  *DONE 1: walk snake
  *DONE 2: definition limits
  *DONE 3: eating food
  *DONE 4: block opposite directions
   TODO 5: eat body and finish
   TODO 6: game over and clear
*/
