  import { auth, onAuthStateChanged, signOut ,getDocs , collection, db} from "./Firebase.js";

const Your_Blog = document.getElementById("Your_Blog");
const loader = document.querySelector(".loader");
const btnsContanier = document.getElementById("btnsContanier");
let getEmail;
let obj = []

window.addEventListener("load", () => {
  stopLoading();

  onAuthStateChanged(auth, async(user) => {
    if (user) {
      const uid = user.uid;
      getEmail = user.email;


      const querySnapshot = await getDocs(collection(db, "PublicCard"));
      const cardDetails = querySnapshot.docs.map((doc) => doc.data());
      cardDetails.forEach((element) => {
      obj.push(element)
      });
      for (const element of obj) {
        blogContainer.innerHTML += `
        <div class="blogCards relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[45rem] flex-row">
                    <div
                      class="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                      <img
                        src="${element.imgurl}"
                        alt="card-image" class="object-cover w-full h-full" />
                    </div>
                    <div class="p-6">
                      <h6
                        class="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                        ${element.goal}
                        </h6>
                        <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        ${element.title}
                      </h4>
                      <p class="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                        ${element.description}
                      </p>
                      <a href="#" class="inline-block"><button
                          class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                          type="button">
                          Learn More<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          stroke-width="2" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                          </svg></button></a>
                          </div>
                          </div>  
                          `;
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
      async function logout() {
        let Logout = document.getElementById("Logout");
        Logout.addEventListener("click", logout);
         function logout(e) {
           e.preventDefault();
           Swal.fire({
             title: "Are you sure?",
             text: "You want to logout?",
             icon: "question",
             showCancelButton: true,
             confirmButtonColor: "#3085d6",
             cancelButtonColor: "#d33",
             confirmButtonText: "Yes, Logout!",
           }).then((result) => {
             if (result.isConfirmed) {
               signOut(auth)
                 .then(() => {
                   Swal.fire({
                     title: "Logged Out",
                     text: "You have successfully logged out!",
                     icon: "success",
                     confirmButtonText: "OK",
                   });
                   window.location.reload();
                 })
                 .catch((error) => {
                   console.log(error);
                 });
             }
           });
         }
       }
       logout();
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
