export const useContactPage=function(){
    console.log("CONTACT PAGE");
    let acc = document.querySelectorAll(".accordion");
    acc.forEach((elm)=>{
        console.log(elm);
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
}