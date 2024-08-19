import { auth , signInWithEmailAndPassword } from "../../Firebase.js"

const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const btn = document.getElementById('btn')
const loader = document.querySelector(".loader")

window.addEventListener("load",stopLoading );

btn.addEventListener("click", e => {
  e.preventDefault()
  btn.disabled = true;

  if (emailInput.value.trim() === "") {
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
  } else{

signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
  .then((userCredential) => {
    startLoading();
    const user = userCredential.user;
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User Login Successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(()=>{
  window.location.replace("../../index.html");
    })
    btn.disabled = false;
    return;
  })
  .catch((error) => {

    btn.disabled = false;
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Password or Email is invalid",
      showConfirmButton: false,
      timer: 1500,
    });
    console.log(error);
    
  });
  }
})

  function startLoading() {
    loader.style.display = "block";
    document.querySelector("section").style.filter = "blur(20px)";
  }
  
  function stopLoading() {
    loader.style.display = "none";
    document.querySelector("section").style.filter = "blur(0px)";
  }
  