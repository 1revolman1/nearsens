
  export const useCasesDetails=function main(){
    console.log(`usecase_details`);
    const scrollable=document.querySelector("section.usecase_details__pageheaderafterscroll");
    function onScrollChange(changes, observer) {
        changes.forEach(change => {
        if (change.intersectionRatio===0) {
            scrollable.classList.add("out-viewport")
            scrollable.style.opacity="1";
            scrollable.style.visibility="visible";
            console.log('Header is outside viewport');
            }else{
            scrollable.classList.remove("out-viewport")
            // scrollable.style.display="none";
            scrollable.style.opacity="0";
            scrollable.style.visibility="hidden";
            console.log('Header is IN THE viewport');
            }
        });
    }
    const options = {
        root: null, //root
        rootMargin: '-100px',
        threshold: 0,
    };
    const observer = new IntersectionObserver(onScrollChange, options);
    const target = document.querySelector('.usecase_details__pageheader');
    if(target) observer.observe(target);
  }