"use strict";

function bringMeTheChild(selectedParent, childClass) {
    var children = selectedParent.childNodes;
    for(var i = 0; i < children.length; i++) {
        var theChild = children[i];
        if (theChild.className === childClass) {
            return theChild;
        }
    }
}//end bringMeTheChild

function getChildByTag(selectedParent, childTag) {
    var children = selectedParent.childNodes;
    for(var i = 0; i < children.length; i++) {
        var theChild = children[i];
        if (theChild.tagName === childTag) {
            return theChild;
        }
    }
}//end getChildByTag

function getCssValue(theElement, theProperty) {
    return window.getComputedStyle(theElement, null).getPropertyValue(theProperty);
}//end getCssValue

function swap(currentElement) {
    var yellowBlock = document.getElementById("yellow"),
        blueBlock = document.getElementById("blue");
    if (currentElement.id === "yellow") {
        yellowBlock.style.zIndex = 1;
        yellowBlock.style.opacity = 1;
        blueBlock.style.zIndex = 0;
        blueBlock.style.opacity = 0.5;
    } else if (currentElement.id === "blue") {
        yellowBlock.style.zIndex = 0;
        yellowBlock.style.opacity = 0.5;
        blueBlock.style.zIndex = 1;
        blueBlock.style.opacity = 1;
    }
}//end swap

function shrinkAllMenus() {
    var theHeaders = document.getElementsByClassName("menuHeader");
    for(var i=0; i<theHeaders.length; i++) {
        shrinkMenu(theHeaders[i]);
    }
}//end shrinkAllMenus

function actionMenu(selectedMenu) {
    var theChild = bringMeTheChild(selectedMenu, 'para'),
        menuState = getCssValue(theChild, "display");
    if (menuState === "block") {
        shrinkMenu(selectedMenu);
    } else {
        shrinkAllMenus();
        expandMenu(selectedMenu);
    }
}//end actionMenu

function shrinkMenu(selectedMenu) {
    var theChild = bringMeTheChild(selectedMenu, 'para'),
        theHeader = getChildByTag(selectedMenu, "H4");
    theChild.style.display = "none";
    theHeader.style.backgroundColor = "#6699FF";
}//end shrinkMenu

function expandMenu(selectedMenu) {
    var theChild = bringMeTheChild(selectedMenu, 'para'),
        theHeader = getChildByTag(selectedMenu, "H4");
    theChild.style.display = "block";
    theHeader.style.backgroundColor = "#0066FF";
}//end expandMenu

document.getElementById("yellow").addEventListener("dblclick", function() {
    swap(this);
});

document.getElementById("blue").addEventListener("dblclick", function() {
    swap(this);
});

var accordianHeaders = document.getElementsByClassName("menuHeader");
for(var i = 0; i < accordianHeaders.length; i++) {
    accordianHeaders[i].addEventListener("click", function() {
    actionMenu(this);
});
}// end for loop

var slideShow = document.getElementsByClassName("slideshow");

function nextSlide() {
    var activeSlide = null,
        slideToClear = null;
    for(var i = 0; i < slideShow.length; i++) {
        if (getCssValue(slideShow[i], "display") === "block"){
            activeSlide = i + 1;
            slideToClear = i;
            if (activeSlide > 2) {
                activeSlide = 0;
            }
        }
    }
    if (activeSlide === null) {
        slideShow[0].style.display = "block"
    } else {
        slideShow[slideToClear].style.display = "none";
        slideShow[activeSlide].style.display = "block";
    }
}// end nextSlide

var slideTimer = setInterval(nextSlide, 5000);
nextSlide();