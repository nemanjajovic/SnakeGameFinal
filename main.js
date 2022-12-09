let board = document.getElementById("board");
let count_record = document.getElementById("record__number");

const SNAKE_SPEED = 5;

let rendered_time = 0;
let snake_position = [{ x: 10, y: 12 }];
let food_position = { x: 10, y: 10 };

const FOOD_VALUE = 1;

let got_position = { x: 0, y: 0 };
let new_position = { x: 0, y: 0 };
let added_value = 0;

function main(current_time) {
  window.requestAnimationFrame(main);
  const time = (current_time - rendered_time) / 1000;
  if (time < 1 / SNAKE_SPEED) {
    return;
  }

  rendered_time = current_time;

  update();
  draw_on_board();
}

window.requestAnimationFrame(main);

document.addEventListener("keydown", (e) => {
  let pressed_key = e.key;
  if (pressed_key === "ArrowUp") {
    if (new_position.y !== 0) return;
    got_position = { x: 0, y: -1 };
    return;
  } else if (pressed_key === "ArrowDown") {
    if (new_position.y !== 0) return;
    got_position = { x: 0, y: 1 };
    return;
  } else if (pressed_key === "ArrowLeft") {
    if (new_position.x !== 0) return;
    got_position = { x: -1, y: 0 };
    return;
  } else if (pressed_key === "ArrowRight") {
    if (new_position.x !== 0) return;
    got_position = { x: 1, y: 0 };
    return;
  }
});

function update() {
  update_snake();
  update_food();
}

function draw_on_board() {
  board.innerHTML = "";
  draw_snake();
  draw_food();
}

function update_snake() {
  if (
    snake_position[0].x === 0 ||
    snake_position[0].x === 21 ||
    snake_position[0].y === 0 ||
    snake_position[0].y === 21
  ) {
    alert("Game Over");
    restart();
  } else {
    add_value_to_snake();
    let move_snake = get_position();
    for (let i = snake_position.length - 2; i >= 0; i--) {
      snake_position[i + 1] = { ...snake_position[i] };
    }
    snake_position[0].x += move_snake.x;
    snake_position[0].y += move_snake.y;
  }
}
function update_food() {
  if (on_food()) {
    added_value += FOOD_VALUE;
    add_value_to_snake();
    food_position = get_random_position();
  }
}

function add_value_to_snake() {
  for (let i = 0; i < added_value; i++) {
    snake_position.push({ ...snake_position[snake_position.length - 1] });
  }
  added_value = 0;
}
function get_position() {
  new_position = got_position;
  return got_position;
}

function on_food() {
  return snake_position.some((position) => {
    return position.x === food_position.y && position.y === food_position.x;
  });
}
function get_random_position() {
  return {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  };
}

function draw_snake() {
  snake_position.forEach((e) => {
    const snake = document.createElement("div");
    snake.style.gridRowStart = e.y;
    snake.style.gridColumnStart = e.x;
    snake.classList.add("snake");
    board.appendChild(snake);
  });
}
function draw_food() {
  const food = document.createElement("div");
  food.style.gridRowStart = food_position.x;
  food.style.gridColumnStart = food_position.y;
  food.classList.add("food");
  board.appendChild(food);
}

function restart() {
  if (count_record.innerHTML < snake_position.length) {
    count_record.innerHTML = snake_position.length;
  }
  snake_position = [{ x: 10, y: 12 }];
  food_position = { x: 10, y: 10 };
  got_position = { x: 0, y: 0 };
  new_position = { x: 0, y: 0 };
}
