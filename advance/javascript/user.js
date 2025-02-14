document.addEventListener("DOMContentLoaded", async function () {
  const nickname = document.getElementById("nickname");
  const errorMessage = document.getElementById("error-message");
  const button = document.getElementById("edit-button");
  const submitButton = document.getElementById("submit-button");
  const toast = document.getElementById("toast");

  button.addEventListener("click", () => {
    if (nickname.value.length === 0) {
      errorMessage.textContent = "닉네임을 입력해주세요.";
    } else if (nickname.value.length > 10) {
      errorMessage.textContent = "닉네임은 최대 10자 까지 작성 가능합니다.";
    } else if (nickname.value === "스타트업코드") {
      errorMessage.textContent = "중복된 닉네임 입니다.";
    } else {
      errorMessage.textContent = "";

      toast.style.display = "block";
      toast.style.opacity = 1;
      setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {}, 500);
      }, 2000);
    }
  });
});
