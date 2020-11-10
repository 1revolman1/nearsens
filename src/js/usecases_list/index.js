function selectorFunc(){
    document.querySelectorAll('.custom-select-wrapper').forEach(function(e){
        const openner=e.querySelector(".custom-select");
        e.addEventListener('click', (elm)=>{
            const listOfAll=document.querySelectorAll(".open");
            //Close if open more than one
            if(listOfAll.length>0 && !openner.classList.contains("open")){
                listOfAll.forEach((opened)=>opened.classList.toggle("open"))
            }
            openner?.classList?.toggle('open');
        })
    })
    window.addEventListener('click', function(e) {
        const select = document.querySelector('.custom-select')
        if (!select.contains(e.target)) {
            select?.classList?.remove('open') ;
        }
    });
    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
            }
        })
    }
}

export const useCasesList=function main(){
    console.log(`USECASES LIST PAGE`);
    selectorFunc();
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
        rootMargin: '-100px',
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