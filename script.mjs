const Your_Blog = document.getElementById('Your_Blog')

Your_Blog.addEventListener("click",()=>{
    window.location.href = "Blogs/blog.html"
})

window.addEventListener("load", () => {
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