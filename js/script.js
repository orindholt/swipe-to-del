const swipeElement = document.querySelectorAll(".swipe-text");

let touchCordStart;
let touchCordMove;


swipeElement.forEach(element => {
    let childrenWidth = element.previousElementSibling.offsetWidth;
    element.addEventListener("touchstart", (e) =>{
        touchCordStart = Math.floor(e.touches[0].clientX);
        console.log(touchCordStart);
    });
    
    element.addEventListener("touchmove", (e) => {
        touchCordMove = Math.floor(e.touches[0].clientX);
        //move 
        if(touchCordMove < touchCordStart 
        && touchCordMove > touchCordStart-childrenWidth){
            e.target.style.transform = `translateX(${touchCordMove-touchCordStart}px)`;
        }
    });
    
    element.addEventListener("touchend", (e) => {
        if(touchCordMove < touchCordStart-childrenWidth){
            //reset to del
            e.target.style.transform = `translateX(-${childrenWidth}px)`;
        } else {
            //reset to 0
            e.target.style.transform = "translateX(0px)";
        }
    });

    element.previousElementSibling.addEventListener("click", ()=>{
        element.parentElement.style.display = "none";
    });
});

document.querySelector("#reset").addEventListener("click", ()=>{
    swipeElement.forEach(element => {
        element.parentElement.style.display = "";  
        element.style.transform = "translateX(0px)";
    })
});

