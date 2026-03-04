let path = require("path");
let fs = require("fs");

module.exports = function(options) {
    return {
        // Hook to copy web.config to dist after build
        onBuildEnd: function(buildResult) {
            try {
                const srcWebConfig = path.join(options.root, "web.config");
                const distWebConfig = path.join(options.root, "dist", "web.config");
                if (fs.existsSync(srcWebConfig)) {
                    fs.copyFileSync(srcWebConfig, distWebConfig);
                    console.log("✓ Copied web.config to dist/");
                }
            } catch (e) {
                console.warn("Could not copy web.config:", e.message);
            }
        }
    }
}