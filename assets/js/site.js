import { Preloader } from './preloader'
import 'slick-carousel'
const $ = require('jquery');
const tilt = require('tilt.js');

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
        this.initTilts();
        this.initSliders();
        const isTouch = this.isTouchDevice();
        if (isTouch) {
            $("html").addClass("touch");
        }
    }

    initSliders() {
        $(".slider").slick();
    }


    isTouchDevice() {
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        var mq = function(query) {
            return window.matchMedia(query).matches;
        }

        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            return true;
        }

        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }

    initTilts() {
        // $('.js-tilt').tilt({
        //     maxTilt:        10,
        //     perspective:    1500,   // Transform perspective, the lower the more extreme the tilt gets.
        //     //easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
        //     scale:          1.01,      // 2 = 200%, 1.5 = 150%, etc..
        //     speed:          300,    // Speed of the enter/exit transition.
        //     transition:     true,   // Set a transition on enter/exit.
        //     disableAxis:    null,   // What axis should be disabled. Can be X or Y.
        //     reset:          true,   // If the tilt effect has to be reset on exit.
        //     glare:          true,  // Enables glare effect
        //     maxGlare:       0.5       // From 0 - 1.
        // });
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
            }, 500);
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