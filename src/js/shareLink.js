export function shareLink() {
    let linkedin = document.querySelector('[data-share-linkedin]');
    let twitter = document.querySelector('[data-share-twitter]');
    let facebook = document.querySelector('[data-share-facebook]');
    let mail = document.querySelector('[data-share-mail]');

    let url = window.location.href;
    const lang = document.documentElement.lang;
    const tweet = lang == 'it' ? 'Leggi%20questo%20articolo' : 'Read%20this%20article';
    const subject = lang == 'it' ? 'Vorrei condividerti questa risorsa' : 'I want to share with you this site';
    const body = lang == 'it' ? 'Dai un occhiata qui:' : 'Take a look here:';


    if (linkedin) {
        linkedin.href = "https://www.linkedin.com/sharing/share-offsite/?url=" + url;
    }
    if (twitter) {
        twitter.href = "https://twitter.com/intent/tweet?text=" + tweet + "%20" + url + "%20%23codeway";
    }
    if (facebook) {
        facebook.href = "https://www.facebook.com/sharer/sharer.php?u=" + url;
    }
    if (mail) {
        mail.href = "mailto:?subject=" + subject + "&amp;body=" + body + " " + url;
    }
}