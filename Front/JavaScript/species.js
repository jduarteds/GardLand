const track = document.getElementById("image-track");

window.onmousedown = e => {
    
    track.dataset.mouseDownAt = e.clientX;
    
}

window.onmousemove = e => {
    
    if (track.dataset.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentageRange = Math.max(-100, Math.min(nextPercentage, 0));
    track.dataset.percentage = nextPercentageRange;

    //track.style.transform = `translate(${nextPercentageRange}%, -50%)`;
    track.animate({
        transform: `translate(${nextPercentageRange}%, -50%)`
    },{ duration : 1200, fill : "forwards"});

    for ( const image of track.getElementsByClassName("image")){
        //image.style.objectPosition = ` ${nextPercentageRange + 100}% 50%`;
        image.animate({
            objectPosition: ` ${nextPercentageRange + 100}% 50%`
        },{ duration : 1200, fill : "forwards"});
    }
    
        
}

window.onmouseup = () => {

    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;

}