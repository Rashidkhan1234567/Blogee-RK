import { auth, onAuthStateChanged, signOut } from "./Firebase.js";

const Your_Blog = document.getElementById("Your_Blog");
const loader = document.querySelector(".loader");
const Logout = document.getElementById("Logout");
const btnsContanier = document.getElementById("btnsContanier");
let getEmail;

window.addEventListener("load", () => {
  stopLoading();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      getEmail = user.email;

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
