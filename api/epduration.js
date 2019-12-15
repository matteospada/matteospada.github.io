function getURL() {
    var url = window.location.href;
    var mp3Path = getSecondPart(url)
    var au = document.createElement('audio');
    au.src = mp3Path
    au.addEventListener('loadedmetadata', function () {

        var duration = au.duration;
        document.body.innerHTML += duration

    }, false);
    document.body.innerHTML
}

function getSecondPart(str) {
    return str.split('?')[1];
}