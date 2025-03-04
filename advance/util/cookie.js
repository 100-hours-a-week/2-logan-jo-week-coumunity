export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const cookieName = cookie.split("=");
    if (name === cookieName[0].trim()) {
      return decodeURIComponent(cookieName[1]);
    }
  }
}
