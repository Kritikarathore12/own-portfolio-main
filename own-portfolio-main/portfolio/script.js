// =================== THEME TOGGLE ===================
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);

themeBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);

  // Add small animation to button
  themeBtn.classList.add("rotate");
  setTimeout(() => themeBtn.classList.remove("rotate"), 400);
});

// =================== MOBILE MENU ===================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.classList.toggle("active");
});

// =================== CONTACT FORM MOCK ===================
function submitContact(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  console.log("Contact form:", data);
  const msg = document.getElementById("formMsg");
  msg.textContent = "✅ Thanks! Your message was captured locally.";
  msg.style.color = "var(--accent)";
  form.reset();
}

// =================== YEAR ===================
document.getElementById("year").textContent = new Date().getFullYear();
