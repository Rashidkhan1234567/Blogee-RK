import {
  auth,
  onAuthStateChanged,
  db,
  getDocs,
  addDoc,
  collection,
} from "../Firebase.js";

const FileInput = document.getElementById("FileInput");
const previewImg = document.getElementById("previewImg");
const uploadImgBtn = document.getElementById("uploadImgBtn");
const btnsContanier = document.getElementById("btnsContanier");
const addBlog = document.getElementById("addBlog");
let url;
let fileData;
let imgIsOk = false;
let getEmail;

FileInput.addEventListener("change", ({ target }) => {
  fileData = target.files[0];

  if (fileData.type.startsWith("image/")) {
    url = URL.createObjectURL(fileData);
    imgIsOk = true;
    previewImg.setAttribute("src", url);
    previewImg.style.display = "";
    uploadImgBtn.style.display = "none";
  } else {
    Swal.fire({
      title: "File Format Not Supported!",
      icon: "error",
    });
    imgIsOk = false;
  }
});

const goal = document.getElementById("goal");
const title = document.getElementById("title");
const Description = document.getElementById("Description");
const cancelBtn = document.getElementById("cancelBtn");
const submitBtn = document.getElementById("submitBtn");
const blogContainer = document.getElementById("blogContainer");
const loader = document.querySelector(".loader");
let cardDetails;

cancelBtn.addEventListener("click", () => {
  document.querySelector(".blog").style.display = "none";
  // document.querySelector("header").style.filter = "blur(0px)"
  document.querySelector("section").style.filter = "blur(0px)";
  document.querySelector("footer").style.filter = "blur(0px)";
});
let obj = []
window.addEventListener("load", async () => {
  stopLoading();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      getEmail = user.email;

      const blogContainer = document.getElementById("blogContainer");
      if (blogContainer <= 0) {
        blogContainer.innerHTML = `
  <h1 class="error">Empty</h1>
  `;
      } else {
        const querySnapshot = await getDocs(collection(db, getEmail));
        const cardDetails = querySnapshot.docs.map((doc) => doc.data());
        cardDetails.forEach((element) => {
        obj.push(element)
        });
        obj.pop()
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
        
        
      }

      submitBtn.addEventListener("click", async (e) => {
        e.preventDefault;

        let cardData = {
          imgurl: url,
          goal: goal.value,
          title: title.value,
          description: Description.value,
          uid: uid,
        };
        await addDoc(collection(db, getEmail), cardData);
        await addDoc(collection(db, "PublicCard"), cardData);
        window.location.reload();
        blogContainer.innerHTML += `
        <img src="${url}">
        `
        goal.value = "";
        title.value = "";
        Description.value = "";
        previewImg.style.display = "none";
        uploadImgBtn.style.display = "";
        url = "";
        document.querySelector(".blog").style.display = "none";
        // document.querySelector("header").style.filter = "blur(20px)"
        document.querySelector("section").style.filter = "blur(0px)";
        document.querySelector("footer").style.filter = "blur(0px)";
      });

      addBlog.addEventListener("click", addBlogWithLogin);

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
      addBlog.addEventListener("click", addBlogWithoutLogin);

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
        window.location.href = "../Form/Sign in/sign in.html";
      });

      sign_up.addEventListener("click", () => {
        window.location.href = "../Form/Sign up/sign up.html";
      });
    }
  });
});

function addBlogWithLogin() {
  document.querySelector(".blog").style.display = "block";
  // document.querySelector("header").style.filter = "blur(20px)"
  document.querySelector("section").style.filter = "blur(20px)";
  document.querySelector("footer").style.filter = "blur(20px)";
}
function addBlogWithoutLogin() {
  if (!auth.currentUser) {
    Swal.fire({
      title: "You are not logged in!",
      text: "Please log in to add a blog",
      icon: "error",
    });
    return;
  }
}

function startLoading() {
  loader.style.display = "block";
  document.querySelector("section").style.filter = "blur(20px)";
}

function stopLoading() {
  let error = document.querySelector(".error");
  loader.style.display = "none";
  document.querySelector("section").style.filter = "blur(0px)";
}
