const $ = require('jquery');
let Wills = Wills || {};
const siteURL = 'http://' + top.location.host.toString();
const $burger = $(".burger a");
const $mmenu = $(".mobile_menu");

$(document).ready(function () {
    window.loadEverything = function () {
        $("body").addClass("loaded");
        $(".loading").addClass("hide").delay(1000).queue(function () { $(this).addClass('back'); });
    }
    Wills.Main.init();
});

Wills.Main = (function () {

    function init() {
        console.log("Main::init()");
        initListener();
    }

    function initListener() {
        const menuLinks = $('a[href^="' + siteURL + '"]:not(".normal-trans"), a[href^="/"]:not(".normal-trans"), a[href^="./"]:not(".normal-trans"), a[href^="../"]:not(".normal-trans")');
        menuLinks.on('click', function(e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;
            e.preventDefault();

            const linkLocation = this.href;

            function redirectPage() {
                window.location = linkLocation;
            }

            $("body").addClass('is-exiting');

            setTimeout(function() {
                redirectPage();
            }, 100);
        });

        $burger.on('click', function(e) {
            $mmenu.toggleClass('open');
        });
    }

    return {
        init: init
    };

})();