const $ = require('jquery');

$(document).ready(function () {
    window.loadEverything = function () {
        $(".loading").addClass("hide").delay(2000).queue(function () { $(this).remove(); });
    }
    //Wills.Main.init();
});