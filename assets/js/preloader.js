import { LoadStylesheets } from './load-stylesheets';
import { FontFaceObserverListener } from './fontFaceObserver'
const $ = require('jquery');

export class Preloader {

    constructor() {
        this._ready = false;
        this._fontsReady = false;
        this._cssReady = false;
        this.LoadStylesheets = new LoadStylesheets();
        this.FontFaceObserver = new FontFaceObserverListener();
    }

    init() {
        console.log('Preloader::init');
        this.initPreloader();
        this.initStyleSheetObserver();
        this.initFontObserver();
    }

    initPreloader() {
        $(document).ready(this.handleWindowLoad());
    }

    handleWindowLoad() {
        this._ready = true;
        // go check everything's ready (we need fonts too)
        this.checkPageReady();
    }

    initStyleSheetObserver() {
        this.LoadStylesheets.load();
        $(document).on('event:cssReady', $.proxy(this.cssReadyHandler, this));
    }

    initFontObserver() {
        this.FontFaceObserver.init();
        // event system.. thanks jQuery!
        $(document).on('event:fontsReady', $.proxy(this.fontsReadyHandler, this));
    }

    cssReadyHandler() {
        console.log("CSS all loaded!");
        this._cssReady = true;
        this.checkPageReady();
    }

    fontsReadyHandler() {
        console.log("Fonts all loaded!");
        this._fontsReady = true;
        this.checkPageReady();
    }

    checkPageReady() {
        // everything done?
        console.log("is everything done? " + this._ready + " " + this._fontsReady + " " + this._cssReady);
        if(this._ready && this._fontsReady && this._cssReady) {
            console.log("Triggering final even!");
            $(document).trigger('event:pageReady');
        }
    }
}