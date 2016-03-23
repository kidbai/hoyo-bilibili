require.config({
    paths: {
        "ejs": '../template/ejs_production',
        "jquery": "../jquery/jquery.min",
        "jquery.unslider": '../jquery/unslider.min'
        // "jquery.bootstrap": "lib/bootstrap.min"
    },
    shim: {
        "jquery.unslider": {
            deps: ["jquery"]
        }
    }
});
