module.exports = function(api) {
    api.cache(true);

    return {
        "env": {
            "test": {
                "presets": [
                    "@babel/preset-react", "@babel/preset-env"
                ]
            }
        }
    }
}