
const FileInput = document.getElementById("FileInput");
const previewImg = document.getElementById("previewImg");
const uploadImgBtn = document.getElementById("uploadImgBtn");
let url;
let fileData;
let imgIsOk = false;

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
        icon: "error"
      });
    imgIsOk = false;
  }
});


const addBlog = document.getElementById('addBlog')

addBlog.addEventListener('click', async () => {
    document.querySelector(".blog").style.display = "block"
// document.querySelector("header").style.filter = "blur(20px)"
document.querySelector("section").style.filter = "blur(20px)"
document.querySelector("footer").style.filter = "blur(20px)"

})

const goal = document.getElementById('goal')
const title = document.getElementById('title')
const Description = document.getElementById('Description')
const cancelBtn = document.getElementById('cancelBtn')

cancelBtn.addEventListener("click",()=>{
    document.querySelector(".blog").style.display = "none"
    // document.querySelector("header").style.filter = "blur(0px)"
    document.querySelector("section").style.filter = "blur(0px)"
    document.querySelector("footer").style.filter = "blur(0px)"
})

window.addEventListener("load", () => {
  let error = document.querySelector('.error')
  error.style.fontSize = "60px"
  let loader = document.querySelector(".loader")
  loader.style.display = "none";
  document.querySelector("section").style.filter = "blur(0px)";
});



const sign_in = document.getElementById('sign in')
const sign_up = document.getElementById('sign up')

sign_in.addEventListener("click", ()=>{
  window.location.href = "Form/Sign in/sign in.html"
})

sign_up.addEventListener("click", ()=>{
  window.location.href = "Form/Sign up/sign up.html"
})