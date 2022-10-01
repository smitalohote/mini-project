let hero = {
  left: 575,
  top: 700,
};

let missiles = [];

let enemies = [
  { left: 200, top: 100 },
  { left: 300, top: 100 },
  { left: 400, top: 100 },
  { left: 500, top: 100 },
  { left: 600, top: 100 },
  { left: 700, top: 100 },
  { left: 800, top: 100 },
  { left: 900, top: 100 },
  { left: 200, top: 175 },
  { left: 300, top: 175 },
  { left: 400, top: 175 },
  { left: 500, top: 175 },
  { left: 600, top: 175 },
  { left: 700, top: 175 },
  { left: 800, top: 175 },
  { left: 900, top: 175 },
];

document.onkeydown = function (event) {
  const left = 37;
  const right = 39;
  const space = 32;
  console.log(event.keyCode);
  if (event.keyCode == left && hero.left >= 20) {
    hero.left = hero.left - 10;
    document.querySelector("#hero").style.left = hero.left;
  }
  if (event.keyCode == right && hero.left <= 1130) {
    hero.left = hero.left + 10;
    document.querySelector("#hero").style.left = hero.left;
  }
  if (event.keyCode == space) {
    missiles.push({ left: hero.left + 20, top: hero.top - 20 });
    console.log(missiles);
    drawMissiles();
  }
};

function drawEnemies() {
  document.querySelector("#enemies").innerHTML = "";
  enemies.forEach((pos) => {
    document.querySelector(
      "#enemies"
    ).innerHTML += `<div class="enemy" style="left: ${pos.left};top:${pos.top}"></div>`;
  });
}
function drawMissiles() {
  document.querySelector("#missiles").innerHTML = ``;
  missiles.forEach((pos) => {
    document.querySelector(
      "#missiles"
    ).innerHTML += `<div class="missile1" style="left: ${pos.left};top:${pos.top}"></div>`;
  });
}
function updateEnemiesPosition() {
  enemies.forEach((enemy) => {
    enemy.top = enemy.top + 2;
  });
}
function updateMissilesPosition() {
  missiles.forEach((missile) => {
    missile.top = missile.top - 20;
  });
}
function checkCollision() {
  for (let enemy = 0; enemy < enemies.length; enemy++) {
    for (let missile = 0; missile < missiles.length; missile++) {
      if (
        missiles[missile].top >= enemies[enemy].top &&
        missiles[missile].top <= enemies[enemy].top + 50 &&
        missiles[missile].left >= enemies[enemy].left &&
        missiles[missile].left <= enemies[enemy].left + 50
      ) {
        enemies.splice(enemy, 1);

        missiles.splice(missile, 1);
      }
    }
  }
}
function gameEnd() {
  if (enemies.length == 0) {
    res = document.createElement("div");
    res.classList.add("result");
    res.textContent = " YOU WIN 🏆";
    document.body.append(res);
    document.getElementById("hero").remove();
    document.getElementById("missiles").remove();
    clearInterval(clearAll);
    document.onkeydown = null;
  } else {
    for (enemy = 0; enemy < enemies.length; enemy++) {
      console.log(hero.top, enemies[enemy].top);
      if (enemies[enemy].top >= hero.top - 40) {
        res = document.createElement("div");
        res.classList.add("result");
        res.textContent = "YOU LOSE !!!";
        document.body.append(res);
        clearInterval(clearAll);
        document.getElementById("hero").remove();
        document.getElementById("missiles").remove();
        document.onkeydown = null;
      }
    }
  }
}
clearAll = setInterval(() => {
  checkCollision();
  updateEnemiesPosition();
  drawEnemies();
  updateMissilesPosition();
  drawMissiles();
  gameEnd();
}, 200);
drawEnemies();
