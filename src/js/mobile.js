export function mobile() {
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "mobile-windows-phone";
        }

        if (/android/i.test(userAgent)) {
            return "mobile-android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "mobile-ios";
        }

        if (/Windows/i.test(userAgent)) {
            return "windows";
        }

        if (/Macintosh/i.test(userAgent)) {
            return "macintosh";
        }

        return "unknown";
    }
    document.querySelector("body").classList.add(getMobileOperatingSystem());

    const updateViewportHeight = () => {
        document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
    };
    updateViewportHeight();
}