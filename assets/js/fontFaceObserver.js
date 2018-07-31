const FontFaceObserver = require('font-face-observer');
const $ = require('jquery');

export class FontFaceObserverListener {

    constructor() {
        this.fontA = new FontFaceObserver('adobe-caslon-pro', {});
        this.fontB = new FontFaceObserver('proxima-nova', {});
        this._fontsReady = false;
        this._fontsLoaded = false;
    }

    init() {
        this.initFontFaceObserver();
    }

    fontsReady(didLoad) {
        this._fontsReady = true;
        this._fontsLoaded = didLoad;
        // event system.. thanks jQuery!
        console.log("fonts loaded? " + this._fontsLoaded);
        $(document).trigger('event:fontsReady');
    }

    initFontFaceObserver() {
		const that = this;
        // FFO provides a basic promise implementation
        Promise.all([this.fontA.check(), this.fontB.check()])
            .then(function () {
                console.log('loaded fonts A & B');
                that.fontsReady(true);
            })
            .catch(function() {
                console.log("couldn't load fonts");
                that.fontsReady(false);
            });
    }
}