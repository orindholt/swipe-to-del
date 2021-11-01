const swipeElement = document.querySelectorAll(".swipe-text");

swipeElement.forEach(element => {
    let touchCordStart;
    let touchCordMove;
    let childrenWidth = element.previousElementSibling.offsetWidth;

    // touch start
    element.addEventListener("touchstart", (e) =>{
        touchCordStart = Math.floor(e.touches[0].clientX);
        console.log(touchCordStart);
    });
    
    // touch move
    element.addEventListener("touchmove", (e) => {
        touchCordMove = Math.floor(e.touches[0].clientX);
        // move functionality 
        if(touchCordMove < touchCordStart 
        && touchCordMove > touchCordStart-childrenWidth){
            e.target.style.transform = `translateX(${touchCordMove-touchCordStart}px)`;
        }
    });
    
    // touch end
    element.addEventListener("touchend", (e) => {
        if(touchCordMove < touchCordStart-(childrenWidth / 2)){
            // snap to child
            e.target.style.transform = `translateX(-${childrenWidth}px)`;
        } else {
            // snap to 0
            e.target.style.transform = "translateX(0px)";
        }
    });

    // delete button
    element.previousElementSibling.addEventListener("click", ()=>{
        element.parentElement.style.transform = "translateX(-100vw)";
        element.parentElement.style.opacity = "0";
        setTimeout(()=>{
            element.parentElement.style.display = "none";
        }, 500);
    });
});

// reset button
document.querySelector("#reset").addEventListener("click", ()=>{
    swipeElement.forEach(element => {
        element.parentElement.style.display = "";  
        element.parentElement.style.transform = "translateX(0)";
        element.parentElement.style.opacity = "1";
        element.style.transform = "translateX(0px)";
    })
});

