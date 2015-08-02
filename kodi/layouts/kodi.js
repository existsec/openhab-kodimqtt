//Change this to match IP or hostname of openhab, not localhost
var openhab_rest = "http://<ip or host>:8080/rest"

//Dynamically update the img element of kodi-thumbnail.html for the current Kodi_Thumbnail item.
//Grabs the item state from the openhab rest interface, which returns a link to the object
//in the kodi image cache.
function thumbnailGet() {
    var thumbnail = new XMLHttpRequest();
    thumbnail.open( "GET", openhab_rest + "/items/Kodi_Thumbnail/state", false);
    thumbnail.send();
    document.write("<img src=\"" + thumbnail.response + "\" >");
}

//Dynamically update the img element of kodi-fanart.html for the current Kodi_Fanart item.
//Grabs the item state from the openhab rest interface, which returns a link to the object
//in the kodi image cache.
function fanartGet() {
    var fanart = new XMLHttpRequest();
    fanart.open( "GET", openhab_rest + "/items/Kodi_Fanart/state", false);
    fanart.send();
    document.write("<img src=\"" + fanart.response + "\" >");
}