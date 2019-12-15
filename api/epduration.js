document.addEventListener('DOMContentLoaded', () => {
        var url = window.location.href;
        var mp3Path = getSecondPart(url)
        var au = document.createElement('audio');
        au.src = mp3Path
        au.addEventListener('loadedmetadata', function () {

            var duration = au.duration;
            var node = document.createElement("p");
            var textnode = document.createTextNode(duration);
            node.appendChild(textnode);
            document.body.appendChild(node);

        }, false);
        document.body.innerHTML

});

function getSecondPart(str) {
    return str.split('?')[1];
}