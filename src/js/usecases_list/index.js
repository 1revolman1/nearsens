

export const useCasesList=function main(){
    console.log(`USECASES LIST PAGE`);
    const scrollable=document.querySelector("section.use_case__scrollheader")
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
        rootMargin: '0px',
        threshold: 0,
    };
    
    const observer = new IntersectionObserver(onScrollChange, options);
    const target = document.querySelector('section.use_case__pageheader');
    if(target) observer.observe(target);

    // const stickyElm = document.querySelector('header.unshow')
    // const pageHeader=document.querySelector(".use_case__pageheader");
    // if(stickyElm && pageHeader){
    //     const observer = new IntersectionObserver( 
    //         ([e]) => pageHeader.classList.toggle('sticky-at-header', e.intersectionRatio < 1),
    //         {threshold: [1]}
    //         );
    //     observer.observe(stickyElm);
    // }
}