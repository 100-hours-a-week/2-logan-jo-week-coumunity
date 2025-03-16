import {
  validateEmail,
  validatePassword,
  validateNickname,
} from "../util/validate.js";

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("file-input");
  const profileImage = document.getElementById("profile-image");
  const changeImageButton = document.getElementById("change-image-button");
  const imageError = document.getElementById("image-error");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordCheckInput = document.getElementById("password-check");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const passwordCheckError = document.getElementById("password-check-error");
  const nicknameInput = document.getElementById("nickname");
  const nicknameError = document.getElementById("nickname-error");
  const editButton = document.getElementById("edit-button");

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
    } else {
      profileImage.src = "/public/images/logo.png";
    }
  });

  function validateImage() {
    if (!fileInput.files.length) {
      imageError.textContent = "*프로필사진을 추가해주세요";
      return false;
    } else {
      imageError.textContent = "";
      return true;
    }
  }

  function EmailMessage() {
    const email = emailInput.value.trim();

    if (!email) {
      emailError.textContent = "*이메일을 입력해주세요";
    } else if (!validateEmail(email)) {
      emailError.textContent =
        "*올바른 주소 형식을 입력해주세요.(예: example@example.com)";
    } else if (email === "startupcode@gmail.com") {
      emailError.textContent = "*중복된 이메일입니다.";
    } else {
      emailError.textContent = "";
    }
  }

  function PasswordMessage() {
    const password = passwordInput.value;

    if (!password) {
      passwordError.textContent = "*비밀번호를 입력해주세요";
      return false;
    } else if (!validatePassword(password)) {
      passwordError.textContent =
        "*비밀번호는 8자 이상, 20자 이하이며 대문자, 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.";
      return false;
    } else if (password !== passwordCheckInput.value) {
      passwordError.textContent = "*비밀번호가 다릅니다.";
      return false;
    } else {
      passwordError.textContent = "";
      return true;
    }
  }

  function validatePasswordCheck() {
    if (passwordCheckInput.value.trim() === "") {
      passwordCheckError.textContent = "*비밀번호를 한번 더 입력해주세요";
      return false;
    } else if (passwordCheckInput.value !== passwordInput.value) {
      passwordCheckError.textContent = "*비밀번호가 다릅니다.";
      return false;
    } else {
      passwordCheckError.textContent = "";
      return true;
    }
  }

  function nicknameMessage() {
    const nickname = nicknameInput.value.trim();

    if (!nickname) {
      nicknameError.textContent = "*닉네임을 입력해주세요";
      return false;
    } else if (nickname.length > 10) {
      nicknameError.textContent = "*닉네임은 10글자 이내로 입력해주세요";
      return false;
    } else if (nickname.includes(" ")) {
      nicknameError.textContent = "*띄어쓰기를 없애주세요";
      return false;
    } else if (validateNickname(nickname)) {
      nicknameError.textContent = "*중복된 닉네임입니다.";
      return false;
    } else {
      nicknameError.textContent = "";
      return true;
    }
  }

  function validateForm() {
    const isImageValid = validateImage();
    const isEmailValid = EmailMessage();
    const isPasswordValid = PasswordMessage();
    const isPasswordCheckValid = validatePasswordCheck();
    const isNicknameValid = nicknameMessage();

    return (
      isImageValid &&
      isEmailValid &&
      isPasswordValid &&
      isPasswordCheckValid &&
      isNicknameValid
    );
  }

  function toggleEditButton() {
    if (validateForm()) {
      editButton.disabled = false;
      editButton.style.cursor = "pointer";
      editButton.style.backgroundColor = "#7F6AEE";
    } else {
      editButton.disabled = true;
      editButton.style.backgroundColor = "#aca0e8";
      editButton.style.cursor = "not-allowed";
    }
  }

  emailInput.addEventListener("input", toggleEditButton);
  passwordInput.addEventListener("input", toggleEditButton);
  passwordCheckInput.addEventListener("input", toggleEditButton);
  nicknameInput.addEventListener("input", toggleEditButton);
  fileInput.addEventListener("change", toggleEditButton);

  editButton.addEventListener("click", function () {
    if (validateForm()) {
      alert("회원가입이 완료되었습니다.");
      window.location.href = "../../index.html";
    }
  });
});
