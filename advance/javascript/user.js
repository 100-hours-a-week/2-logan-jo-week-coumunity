document.addEventListener("DOMContentLoaded", function () {
  const nicknameInput = document.getElementById("nickname");
  const errorMessage = document.getElementById("error-message");
  const editButton = document.querySelector(".button");
  const toast = document.getElementById("toast");
  const fileInput = document.getElementById("file-input");
  const profileImage = document.getElementById("profile-image");
  const changeImageButton = document.getElementById("change-image-button");
  const submitButton = document.getElementById("submit-button");

  editButton.addEventListener("click", function () {
    const nicknameValue = nicknameInput.value.trim();

    if (nicknameValue === "") {
      errorMessage.textContent = "*닉네임을 입력해주세요";
    } else if (nicknameValue.length < 2 || nicknameValue.length > 10) {
      errorMessage.textContent = "*닉네임은 최대 10자 까지 작성 가능합니다.";
    } else if (nicknameValue === "스타트업코드") {
      errorMessage.textContent = "*중복된 닉네임 입니다.";
    } else {
      errorMessage.textContent = "";
      console.log("닉네임 수정:", nicknameValue);

      toast.style.display = "block";
      toast.style.opacity = 1;
      setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {
          toast.style.display = "none";
        }, 500);
      }, 2000);
    }
  });

  submitButton.addEventListener("click", () => {
    window.location.href = "/page/post.html";
  });

  changeImageButton.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});
