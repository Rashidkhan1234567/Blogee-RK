import {
  auth,
  onAuthStateChanged,
  signOut,
  getDocs,
  collection,
  db,
} from ".././Firebase.js";

const profileLogout = document.querySelector(".profile .btn");
const logoutBtn = document.getElementById("logout");

const username = document.getElementById("username");
const useremail = document.getElementById("useremail");
const usernameEdit = document.getElementById("usernameEdit");
const loadCon = document.getElementById("loadForm");
const inputContainer = document.getElementById("inputContainer");
const newUsername = document.getElementById("newUsername");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const alertCheckbox = document.querySelector(".alertCheckbox");
const alertMess = document.getElementById("alertMess");
const Your_Blog = document.getElementById("Your_Blog");
const loader = document.querySelector(".loader");
const Logout = document.getElementById("Logout");
const btnsContanier = document.getElementById("btnsContanier");
let getEmail;
let userDetails;

username.innerHTML = "Guest";
useremail.innerHTML = "guest@gmail.com";
window.addEventListener("load", () => {
  stopLoading();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      getEmail = user.email;
      const querySnapshot = await getDocs(collection(db, getEmail));
      querySnapshot.forEach((doc) => {
        userDetails = doc.data();
      });
      console.log(userDetails);

      if (userDetails != undefined && userDetails != null) {
        let firstLetter = userDetails.userName.slice(0, 1).toUpperCase();
        let otherLetter = userDetails.userName.slice(1).toLowerCase();
        let fullName = firstLetter + otherLetter;
        username.innerHTML = fullName;
        useremail.innerHTML = userDetails.userEmail;
      }

      btnsContanier.innerHTML = `
       <button
         type="button"
         class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-3"
         id="Logout"
         >
         Logout
       </button>
      `;
    } else {
      btnsContanier.innerHTML = `
       <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-3"
        id="sign in"
        >
        Sign in
      </button>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        id="sign up"     
        >
        Sign up
     </button>
      `;
      document.getElementById("logout2").innerHTML = "Sign in";
      const sign_in = document.getElementById("sign in");
      const sign_up = document.getElementById("sign up");
      sign_in.addEventListener("click", () => {
        window.location.href = "Form/Sign in/sign in.html";
      });

      sign_up.addEventListener("click", () => {
        window.location.href = "Form/Sign up/sign up.html";
      });
    }
  });
});

function startLoading() {
  loader.style.display = "block";
  document.querySelector("section").style.filter = "blur(20px)";
}

function stopLoading() {
  loader.style.display = "none";
  document.querySelector("section").style.filter = "blur(0px)";
}

Your_Blog.addEventListener("click", () => {
  window.location.href = "Blogs/blog.html";
});

const img = document.getElementById("img");
const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", ({ target }) => {
  console.log(target);
  
  // loadCon.classList.remove("noneForm");
  let imgIsOk;
  let url;
  let fileData = target.files[0];

  if (fileData.type.startsWith("image/")) {
    url = URL.createObjectURL(fileData);
    imgIsOk = true;
    img.setAttribute("src", url);
    
  } else {
    alert("error")
    imgIsOk = false;
  }
});

usernameEdit.addEventListener("click", () => {
  inputContainer.classList.add("active");
});

cancelBtn.addEventListener("click", () => {
  inputContainer.classList.remove("active");
  setTimeout(() => {
    newUsername.value = "";
  }, 500);
});

saveBtn.addEventListener("click", () => {
  if (newUsername.value.trim() === "") {
    alertMess.innerHTML = "Username Reqiured!";
    alertCheckbox.click();
  } else if (newUsername.value.trim().length < 4) {
    alertMess.innerHTML =
      "Please enter at least 4 characters for the username!";
    alertCheckbox.click();
  } else if (!/^[a-zA-Z]+$/.test(newUsername.value)) {
    alertMess.innerHTML =
      "Please enter only alphabet characters for the username!";
    alertCheckbox.click();
  } else {
    loadCon.classList.remove("noneForm");
    updateProfile(auth.currentUser, {
      displayName: newUsername.value,
    })
      .then(() => {
        loadCon.classList.add("noneForm");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
