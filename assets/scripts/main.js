$(window).load(function () {
    setSliders();
    runHamburger();
    showToast();
});

function runHamburger(){
    $("#header_icon").click(function() {
        $(this).toggleClass("open");

        $(".header-menu_list").toggleClass("header-menu_toggle");
    });
}

function showToast() {

    if($(".toast")){
        $(".toast").addClass("toast-show");

        setTimeout(() => { $(".toast").removeClass("toast-show"); }, 3000);
    }
}

function setSliders(){
    $("#sliderTop .carousel-item:first-child").addClass("active");
    $("#sliderBot .carousel-item:first-child").addClass("active");
}