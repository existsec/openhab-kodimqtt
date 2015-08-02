#!/bin/bash
OH_Config_Base="/etc/openhab/configurations/"
OH_Items="items/"
OH_Rules="rules/"
OH_Sitemaps="sitemaps/"
Kodi_Items="kodi.items"
Kodi_Rules="kodi.rules"
Kodi_Sitemaps="kodi.sitemaps"

Items_Path=$OH_Config_Base$OH_Items
Rules_Path=$OH_Config_Base$OH_Rules
Sitemaps_Path=$OH_Config_Base$OH_Sitemaps

cp $Kodi_Items $Items_Path
cp $Kodi_Rules $Rules_Path
cp $Kodi_Sitemaps $Sitemaps_Path
