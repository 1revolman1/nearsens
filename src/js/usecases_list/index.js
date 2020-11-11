function selectorFunc(){
    for (const dropdown of document.querySelectorAll(".custom-select-wrapper")) {
        // const widthDropdownBlock=dropdown?.querySelector(".custom-options")?.getBoundingClientRect()?.width
        // dropdown.setAttribute("data-size",widthDropdownBlock);
        // dropdown.style.width=`${dropdown.getBoundingClientRect().width}px`
        // const initialWidth=dropdown.getBoundingClientRect()?.width
        dropdown.addEventListener('click', function() {
            const listOfAll=document.querySelectorAll(".custom-select-wrapper.open");
            if(listOfAll.length>0 && !dropdown.classList.contains("open"))
                listOfAll.forEach((opened)=>opened.classList.toggle("open"));
            this.classList.toggle("open");
            // if(dropdown.classList.contains("open"))
            //     dropdown.style.width=`${this.dataset.size}px`;
            // else dropdown.style.width=`${initialWidth}px`;
            // this.querySelector('.custom-select').classList.toggle('open');
        })
    }
    window.addEventListener('click', function(e) {
        for (const select of document.querySelectorAll('.custom-select-wrapper.open')) {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        }
    });

    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function(event) {
            event.stopPropagation();
            if (!this.classList.contains('selected')) {
                //При выборе 1 элемента - закрыть текущий
                // this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                //Подставить на место заголовка - выбранный элемент
                // this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
            }
        })
    }
}

export const useCasesList=function main(){
    console.log(`USECASES LIST PAGE`);
    selectorFunc();
    const scrollable=document.querySelector("section.use_case__scrollheader");
    const scrollToThisBlock=document.querySelector(".use_case__filter");
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
    document.querySelector(".use_case__scrollheader-content-container__picker")?.addEventListener("click",function(event){
        scrollToThisBlock.scrollIntoView({block: "center", behavior: "smooth"});
    })
    
    const observer = new IntersectionObserver(onScrollChange, options);
    const target = document.querySelector('section.use_case__pageheader');
    if(target) observer.observe(target);
}