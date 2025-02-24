function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const cookieName = cookie.split("=");
    if (name === cookieName[0].trim()) {
      return decodeURIComponent(cookieName[1]);
    }
  }
}

const logo = document.getElementById("logo");
const userMenu = document.getElementById("user-menu");

const userCookie = getCookie("user");
if (userCookie) {
  try {
    const user = JSON.parse(userCookie);

    if (user.profile_image) {
      logo.src = user.profile_image;
    }
  } catch (e) {
    console.log(err);
    window.location.href = "../index.html";
  }
}

logo.addEventListener("click", () => {
  if (userMenu.style.display === "none") {
    userMenu.style.display = "block";
  } else {
    userMenu.style.display = "none";
  }
});
