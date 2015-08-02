Openhab Configuration for Kodi over MQTT
========================================

This is a collection of rules, items, and a webapp for binding kodi and openhab using MQTT.
Work in progress, still cleaning things up and adding functionality. 


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
