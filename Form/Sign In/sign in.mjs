import { auth , signInWithEmailAndPassword } from "../../Firebase.js"

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


window.addEventListener("load",stopLoading );
  function startLoading() {
    loader.style.display = "block";
    document.querySelector("section").style.filter = "blur(20px)";
  }
  
  function stopLoading() {
    loader.style.display = "none";
    document.querySelector("section").style.filter = "blur(0px)";
  }
  