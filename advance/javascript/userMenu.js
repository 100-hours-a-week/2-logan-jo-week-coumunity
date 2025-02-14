const logo = document.getElementById("logo");
const userMenu = document.getElementById("user-menu");

logo.addEventListener("click", () => {
  if (userMenu.style.display === "none") {
    userMenu.style.display = "block";
  } else {
    userMenu.style.display = "none";
  }
});
