import { Preloader } from './preloader'
const $ = require('jquery');

export class Main {

    constructor() {
        this._startTime = new Date();
        this._preloader = new Preloader();
        this.$mmenu = $(".mobile_menu");
        this.$burger = $(".burger a");
        this.siteURL = 'http://' + top.location.host.toString();
    }

    init() {
        console.log("Main::init()");
        this.initListener();
        this.initPreloader();
    }

    initPreloader() {

        console.log("EveryPage::initPreloader");

        this._startTime = new Date();
        this._preloader.init();

        $(document).on('event:pageReady', $.proxy(this.pageReadyHandler, this));
    }

    pageReadyHandler() {
        console.log('EveryPage::pageReadyHandler');
        const visibleTime = 1000;
        const _endTime = new Date();
        const _timeout = Math.max(visibleTime - (_endTime - this._startTime), 0);

        setTimeout(this.showPage, _timeout);
    }

    showPage() {
        $("body").addClass("loaded");
        $(".loading").addClass("hide").delay(1000).queue(function () { $(this).addClass('back'); });
    }

    initListener() {
        const menuLinks = $('a[href^="' +this.siteURL + '"]:not(".normal-trans"), a[href^="/"]:not(".normal-trans"), a[href^="./"]:not(".normal-trans"), a[href^="../"]:not(".normal-trans")');
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
        const that = this;
        this.$burger.on('click', function(e) {
            $(this).parent('.burger').toggleClass('open');
            that.$mmenu.toggleClass('open');
        });
    }
}

const website = new Main();
$(document).ready(function () {
    // window.loadEverything = function () {
    //     $("body").addClass("loaded");
    //     $(".loading").addClass("hide").delay(1000).queue(function () { $(this).addClass('back'); });
    // }
    website.init();
});