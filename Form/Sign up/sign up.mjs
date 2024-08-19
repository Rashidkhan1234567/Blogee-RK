import {
  createUserWithEmailAndPassword,
  auth,
  db,
  addDoc,
  collection,
} from "./../../Firebase.js";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btn = document.getElementById("btn");
const loader = document.querySelector(".loader");

window.addEventListener("load", stopLoading);

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  btn.disabled = true;

  if (nameInput.value.trim() === "") {
    nameInput.value = "";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Username reqiured!",
      showConfirmButton: false,
      timer: 1500,
    });
    btn.disabled = false;
    return;
  } else if (nameInput.value.trim().length < 4) {
    nameInput.value = "";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Please enter at least 4 characters for the username!",
      showConfirmButton: false,
      timer: 1500,
    });
    btn.disabled = false;
    return;
  } else if (!/^[a-zA-Z]+$/.test(nameInput.value)) {
    nameInput.value = "";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Please enter only alphabet characters for the username!",
      showConfirmButton: false,
      timer: 1500,
    });
    btn.disabled = false;
    return;
  } else if (emailInput.value.trim() === "") {
    emailInput.value = "";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Email reqiured!",
      showConfirmButton: false,
      timer: 1500,
    });
    btn.disabled = false;
    return;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailInput.value = "";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Please enter a valid email address!",
      showConfirmButton: false,
      timer: 1500,
    });
    btn.disabled = false;
    return;
  } else if (passwordInput.value.trim() === "") {
    passwordInput.value = "";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Password reqiured!",
      showConfirmButton: false,
      timer: 1500,
    });
    btn.disabled = false;
    return;
  } else if (passwordInput.value.includes(" ")) {
    passwordInput.value = "";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Password should not contain spaces!",
      showConfirmButton: false,
      timer: 1500,
    });
    btn.disabled = false;
    return;
  } else if (passwordInput.value.trim().length < 6) {
    passwordInput.value = "";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Please enter at least 6 characters for the password!",
      showConfirmButton: false,
      timer: 1500,
    });
    btn.disabled = false;
    return;
  } else {
    startLoading();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      );
      const user = userCredential.user;
      const userData = {
        userName: nameInput.value,
        userEmail: emailInput.value,
      };
      await addDoc(collection(db, emailInput.value), userData);
      console.log("User created successfully!");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Created Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      nameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      stopLoading();
      window.location.href = "../Sign In/sign in.html";
      btn.disabled = false;
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          emailInput.value = "";
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Email is invalid!",
            showConfirmButton: false,
            timer: 1500,
          });
          btn.disabled = false;
          break;

        case "auth/invalid-password":
          passwordInput.value = "";
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Password is invalid!",
            showConfirmButton: false,
            timer: 1500,
          });
          btn.disabled = false;
          break;

        case "auth/email-already-in-use":
          passwordInput.value = "";
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Email already in use!",
            showConfirmButton: false,
            timer: 1500,
          });
          btn.disabled = false;
          break;

        default:
          break;
      }
      stopLoading();
    }
  }
});

function startLoading() {
  loader.style.display = "block";
  document.querySelector("section").style.filter = "blur(20px)";
}

function stopLoading() {
  loader.style.display = "none";
  document.querySelector("section").style.filter = "blur(0px)";
}
