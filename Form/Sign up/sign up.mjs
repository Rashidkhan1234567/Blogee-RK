import { createUserWithEmailAndPassword, auth , db,addDoc, collection} from "./../../Firebase.js";

const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("btn");



btn.addEventListener("click", async(e) => {
  e.preventDefault();
  btn.disabled = true
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    email.value = ""
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Invalid Email Address!",
      showConfirmButton: false,
      timer: 1500,
    });
  btn.disabled = false
    return;
  } else if (name.value && email.value && password.value) {
    startLoading();
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async(userCredential) => {
        try {
          const docRef = await addDoc(collection(db, email.value), {
            userName : name.value,
            userEmaiil : email.value 
          });
          console.log("Document written with ID: ", docRef.id);
          stopLoading()
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        stopLoading();
        const user = userCredential.user;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then((response) => {
          name.value = "";
          email.value = "";
          password.value = "";
          stopLoading();
          // window.location.href = "../Sign In/sign in.html";
          btn.disabled = false
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        btn.disabled = false

        // ..
      });
  }
});

window.addEventListener("load", startLoading);

function startLoading() {
  let loader = document.querySelector(".loader");
  loader.style.display = "none";
  document.querySelector("section").style.filter = "blur(0px)";
}

function stopLoading() {
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.querySelector("section").style.filter = "blur(20px)";
}
