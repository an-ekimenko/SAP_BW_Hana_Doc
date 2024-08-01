scnHeader.init(headerInitArgs);
setCookie("userArgs", headerInitArgs.user ? JSON.stringify(headerInitArgs.user) : "");
if (headerInitArgs.fallback) {
    document.addEventListener("DOMContentLoaded", function () {
        scnHeader.populateSAPLogo(scnHeader.args.wpHeaderImagePath);
        scnHeader.populateSVGLogo(scnHeader.args.wpHeaderImagePath);
        scnHeader.setVisibleSapLogo();
    });
}