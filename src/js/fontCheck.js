export function fontCheck() {
    // Check if API exists
    if (document && document.fonts) {
        // Do not block page loading
        setTimeout(function() {
            document.fonts.load('16px "Tusker Grotesk"').then(() => {
                // Make font using elements visible
                document.documentElement.classList.add('font-loaded')
            })
        }, 0)
    } else {
        // Fallback if API does not exist 
        document.documentElement.classList.add('font-loaded')
    }
}