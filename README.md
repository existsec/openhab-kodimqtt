Openhab Configuration for Kodi over MQTT
========================================

This is a collection of rules, items, and a webapp for binding kodi and openhab using MQTT.
Work in progress, still cleaning things up and adding functionality. 

Overview
--------
This kodi configuration for openhab subscribes to topics published by the [MQTT Addon for Kodi](https://github.com/owagner/kodi2mqtt) running under kodi. I chose to use MQTT as I was having trouble with the existing openhab xbmc binding that handled the JSON-RPC requests from openhab itself. It's entirely possible this had something to do with my environment as I didn't fully rule that out. Instead I came up with this configuration that I'll go over in some detail.

######Items
```
String Kodi_PlaybackState_Raw         "Last Kodi Playback State (Raw) [%s]"  {mqtt="<[mosquitto:kodi/status/playbackstate:state:default]"}
String Kodi_Title_Raw                 "Last Kodi Title (Raw) [%s]"           {mqtt="<[mosquitto:kodi/status/title:state:default]"}
String Kodi_Progress_Raw              "Last Kodi Progress (Raw) [%s]"        {mqtt="<[mosquitto:kodi/status/progress:state:default]"}
```
These three incoming MQTT items subscribe to the 3 status topics published by [MQTT Addon for Kodi](https://github.com/owagner/kodi2mqtt) which will be JSON objects just as if you were to be doing a POST to request the information. Instead [MQTT Addon for Kodi](https://github.com/owagner/kodi2mqtt) handles requesting the data and publishing it out, leaving openhab to subscribing, and parsing the JSON objects.

######Rules
```
rule "Kodi_Progress_Raw Parser"
  when 
    Item Kodi_Progress_Raw changed
  then
    var String json = (Kodi_Progress_Raw.state as StringType).toString
    var String progress = transform("JSONPATH", "$.val", json)
    var String time  = transform("JSONPATH", "$.kodi_time", json)
    var String totaltime  = transform("JSONPATH", "$.kodi_totaltime", json)

    sendCommand(Kodi_Progress,  progress)
    sendCommand(Kodi_Time, time)
    sendCommand(Kodi_TotalTime, totaltime) 
 
  end
```
This is one of the more basic rules, but works as a great example to show what is happening. Basically we're taking the state of the Item that's holding the complete JSON object. This particular rule performs 3 transforms all at the root level of the object as this is a very simple list of an object. The rest of the rules gets more complicated, but it's just more of this basic concept. This method should work for parsing any JSON object in openhab. However, as far as the rules included so far I've only parsed the status/progress and status/title so far. I still have playbackstate for incoming that I need to parse and then I need to implement the items for sending commands from openhab to kodi. 

######Webapp
This webapp is how I'm getting the thumbnail and fanart images from the kodi device to openhab. At `http://kodi.host:8080/image/` is the image cache. The JSON-RPC API can provide the url_encoded objects you need to supply at the end of the image cache URL to get the image. The problem is there's no dynamic Image or Webview elements in the sitemaps in openhab. This is intentional and is done so to prevent a security vulnerability. So how I'm handling this is by using javascript `kodi.js` to request the `Kodi_Thumbnail` and `Kodi_Fanart` Item states from the openhab rest api. These particular items will return the complete URL for the remote image that then gets set as the img src for the html page that called the given javascript function. `kodi-thumbnail.html` and `kodi-fanart.html` are the two html files to work with here. They each can be called from a Webview element. This is one area of this overall configuration I need to make some adjustments. Currently the request to the Kodi device is done synchronously, which I need to revise.  


Dependencies
------------
* For Kodi: [MQTT Addon for Kodi](https://github.com/owagner/kodi2mqtt)
* For Openhab: Make sure MQTT binding is installed and configured in openhab.cfg. 

Installation
------------
* Copy folder "kodi" to openhab webapps directory.
* Copy kodi.items to items configuration directory.
* Copy kodi.rules to rules configuration directory.
* Copy kodi.sitemap to sitemaps configuration directory.

Configuration
-------------
#####kodi/layouts/kodi.js 
Edit `openhab_rest` at the top of the file for the IP or Hostname of the openhab server, don't use localhost for this: 
```
var openhab_rest = "http://<ip or host>:8080/rest"
```

#####kodi.rules
Edit the `kodi_URL` variable in this file to match your environment. It can be found just below the imports and looks like this:
```
var String Kodi_URL = "http://localhost:8080"
```

#####sitemap
An example kodi.sitemap is included for quick testing of functionality.
