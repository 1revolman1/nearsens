

export const useCasesList=function main(){
    console.log(`USECASES LIST PAGE`);
    const stickyElm = document.querySelector('header.unshow')
    const pageHeader=document.querySelector(".use_case__pageheader");
    if(stickyElm && pageHeader){
        const observer = new IntersectionObserver( 
            ([e]) => pageHeader.classList.toggle('sticky-at-header', e.intersectionRatio < 1),
            {threshold: [1]}
            );
        observer.observe(stickyElm);
    }
}