
//Bind keypress event to textbox
$('#search-input').keypress(async function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {

        $("#result").text("Questo podcast non può essere riprodotto");
        var query = $("#search-input").val()
        $("#search-input").val("")
        url = "https://itunes.apple.com/search?media=podcast&country=IT&term=" + query
        url = "https://api.rss2json.com/v1/api.json?rss_url="+url
        var data = await $.get(url, function (data) {
             var itunesData = data
             return itunesData
        });

        var converToJson = await JSON.parse(data)
        var feedURL = converToJson.results[0].feedUrl
        var feedURL = "https://api.rss2json.com/v1/api.json?rss_url="+feedURL
        
        var episodeInfo = await $.get(feedURL, function (data) {
            var XMLData = data
            return XMLData
       });

       var title = episodeInfo.feed.title
       console.log(title)
       var mp3Path = episodeInfo.items[0].enclosure.link;
       console.log(mp3Path)
       
       if (!mp3Path.startsWith('https')) { 
        $("#result").text("❌ " + title + " non può essere riprodotto"); 
       } else {
        $("#result").text("✔️" + title + " può essere riprodotto"); 
       }
       
    }
    event.stopPropagation();
});
