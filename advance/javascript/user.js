import { getCookie } from "../util/cookie.js";
import { validateNickname } from "../util/validate.js";

document.addEventListener("DOMContentLoaded", function () {
  const nicknameInput = document.getElementById("nickname");
  const errorMessage = document.getElementById("error-message");
  const editButton = document.querySelector(".button");
  const toast = document.getElementById("toast");
  const fileInput = document.getElementById("file-input");
  const profileImage = document.getElementById("profile-image");
  const changeImageButton = document.getElementById("change-image-button");
  const submitButton = document.getElementById("submit-button");
  const deleteUserButton = document.getElementById("delete-user");
  const deleteModal = document.getElementById("delete-modal");
  const confirmDeleteButton = document.getElementById("confirm-delete");
  const cancelDeleteButton = document.getElementById("cancel-delete");
  const emailText = document.getElementById("email-text");

  const user = getCookie("user");
  let userInfo;
  if (user) {
    try {
      userInfo = JSON.parse(user);
      emailText.textContent = userInfo.email;
      nicknameInput.value = userInfo.nickname;
      profileImage.src = userInfo.profile_image;
    } catch (e) {
      console.log(e);
      window.location.href = "/index.html";
    }
  }

  editButton.addEventListener("click", function () {
    const nicknameValue = nicknameInput.value.trim();

    if (nicknameValue === "") {
      errorMessage.textContent = "*닉네임을 입력해주세요";
    } else if (nicknameValue.length < 2 || nicknameValue.length > 10) {
      errorMessage.textContent = "*닉네임은 최대 10자 까지 작성 가능합니다.";
    } else if (validateNickname(nicknameValue)) {
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
    window.location.href = "/page/posts.html";
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

  deleteUserButton.addEventListener("click", function () {
    deleteModal.style.display = "flex";
  });

  confirmDeleteButton.addEventListener("click", function () {
    window.location.href = "../../index.html";
  });

  cancelDeleteButton.addEventListener("click", function () {
    deleteModal.style.display = "none";
  });
});
