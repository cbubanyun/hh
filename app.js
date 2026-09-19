const pet = document.querySelector("#pet");
const splash = document.querySelector("#splash");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let sprayTimer = null;
let active = false;

function makeDrop() {
  const drop = document.createElement("i");
  drop.className = "drop";

  const angle = (-2.7 + Math.random() * 1.15);
  const distance = 70 + Math.random() * 90;
  const x = 80 + Math.cos(angle) * distance;
  const y = 183 + Math.sin(angle) * distance;
  const size = 5 + Math.random() * 7;

  drop.style.setProperty("--x", x + "px");
  drop.style.setProperty("--y", y + "px");
  drop.style.setProperty("--size", size + "px");
  drop.style.setProperty("--duration", (reducedMotion.matches ? 120 : 420 + Math.random() * 220) + "ms");
  drop.addEventListener("animationend", () => drop.remove(), { once: true });
  splash.append(drop);
}

function beginSpray() {
  if (active) return;
  active = true;
  pet.classList.add("is-spraying");
  pet.setAttribute("aria-pressed", "true");

  makeDrop();
  sprayTimer = window.setInterval(makeDrop, reducedMotion.matches ? 180 : 72);
}

function endSpray() {
  if (!active) return;
  active = false;
  pet.classList.remove("is-spraying");
  pet.setAttribute("aria-pressed", "false");
  window.clearInterval(sprayTimer);
  sprayTimer = null;
}

pet.addEventListener("pointerenter", beginSpray);
pet.addEventListener("pointerleave", endSpray);
pet.addEventListener("focus", beginSpray);
pet.addEventListener("blur", endSpray);

pet.addEventListener("click", () => {
  if (active) {
    endSpray();
  } else {
    beginSpray();
  }
});

reducedMotion.addEventListener("change", () => {
  if (active) {
    endSpray();
    beginSpray();
  }
});