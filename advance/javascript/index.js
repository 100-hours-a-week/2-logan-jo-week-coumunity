document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");
  const loginButton = document.getElementById("login-submit");

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordPattern.test(password);
  }
  function validateInputs() {
    const emailValid = validateEmail(emailInput.value);
    const passwordValid = validatePassword(passwordInput.value);

    if (!emailValid) {
      errorMessage.textContent = "올바른 이메일 형식을 입력하세요.";
      loginButton.style.backgroundColor = "#aca0eb";
      loginButton.disabled = true;
      loginButton.style.cursor = "not-allowed";
    } else if (!passwordValid) {
      errorMessage.textContent =
        "비밀번호는 8~20자이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.";
      loginButton.style.backgroundColor = "#aca0eb";
      loginButton.disabled = true;
      loginButton.style.cursor = "not-allowed";
    } else {
      errorMessage.textContent = "";
      loginButton.style.backgroundColor = "#7F6AEE";
      loginButton.disabled = false;
      loginButton.style.cursor = "pointer";
    }
  }
  function handleSubmit() {
    const email = emailInput.value;
    const password = passwordInput.value;

    fetch("../data/users.json")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        const matchedUser = users.find(
          (user) => user.email === email && user.password === password
        );
        if (matchedUser) {
          document.cookie =
            "user=" +
            encodeURIComponent(JSON.stringify(matchedUser)) +
            "; path=/; max-age=3600";
          window.location.href = "posts.html";
        } else {
          alert("이메일 또는 비밀번호가 일치하지 않습니다.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => {
        emailInput.value = "";
        passwordInput.value = "";
      });
  }
  emailInput.addEventListener("input", validateInputs);
  emailInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (emailInput.value && !passwordInput.value) {
        passwordInput.focus();
      } else if (emailInput.value && passwordInput.value) {
        handleSubmit();
      }
    }
  });
  passwordInput.addEventListener("input", validateInputs);
  passwordInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (emailInput.value && passwordInput.value) {
        handleSubmit();
      }
    }
  });
  loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    handleSubmit();
  });

  validateInputs();
});
