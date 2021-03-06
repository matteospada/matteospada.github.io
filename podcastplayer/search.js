//Bind keypress event to textbox

$('#search-input').keypress(async function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {

        $("#result").text("⏳ Sto cercando il podcast...")
        var query = $("#search-input").val()
        $("#search-input").val("")
        url = "https://itunes.apple.com/search?media=podcast&country=IT&term=" + query
        url = "https://cors-anywhere.herokuapp.com/"+url
  

        var data = await $.get(url, function (data) {
             var itunesData = data
             return itunesData
        });
        
        var converToJson = await JSON.parse(data)
        
        if(!converToJson.resultCount == "0"){
        
        var feedURL = converToJson.results[0].feedUrl
        var feedURL = "https://api.rss2json.com/v1/api.json?rss_url="+feedURL
        
        var episodeInfo = await $.get(feedURL, function (data, status) {
            getStatus = status
            var XMLData = data
            return XMLData
       });

       var title = episodeInfo.feed.title
       var mp3Path = episodeInfo.items[0].enclosure.link;
       
       if (!mp3Path.startsWith('https')) { 
        $("#result").html("<p>❌ " + title + " non può essere riprodotto, vuoi <a href='#modal' data-toggle='modal' data-target='#exampleModal'> sapere perché?</a></p>") 
       } else {
        $("#result").text("✔️" + title + " può essere riprodotto"); 
       }

    } else { $("#result").text("❌ Non conosco questo podcast"); }
       
    }
    event.stopPropagation();
});


//("❌ " + title + " non può essere riprodotto, vuoi"