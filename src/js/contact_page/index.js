export const useContactPage=function(){
    console.log("CONTACT PAGE");
    let acc = document.querySelectorAll(".accordion");
    acc.forEach((elm)=>{
        elm.addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    })
    const hidden=document.querySelector(".contact__findanswer__wrap__secondinit");
    const btnContainer=document.querySelector(".contact__findanswer__wrap__firstinit");
    document.querySelector(".contact__findanswer__wrap__btn").addEventListener("click",function(elm){
      // console.log(elm)
      btnContainer.classList.add("unshow");
      hidden.classList.add("show");
    });
    
}