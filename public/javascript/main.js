let click = true;

function toggleSearch(val) {
    let search = document.getElementById("search_box").style
    if(val) {
        search.visibility = "visible";
        document.getElementById("search").focus();
        click = false;
        setTimeout(() => {
            click = true;
        }, 100);
    }
    else if(!val){
        search.visibility = "hidden";
    }
}

function eventOutsideClick(event) {
    let searchBox = document.getElementById('search_box');
    let isClickInside = searchBox.contains(event.target);

    if (!isClickInside && searchBox.style.visibility == "visible" && click) {
        toggleSearch(false);
    }
}

function getTopOffset(element) {
    var yPosition = 0;
    
    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition
}

function scrollShop() {
    console.log("scroll to shop")
    window.scrollTo({
        top: getTopOffset(document.getElementById("productsIndex")) - 136,
        left: 0,
        behavior: "smooth"
    });
}

function updateZoom(img){
    $('.zoo-item').ZooMove({
        image: img
    });
}