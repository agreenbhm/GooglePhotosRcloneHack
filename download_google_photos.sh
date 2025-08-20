adb exec-out am start com.google.android.apps.photos
sleep 2

coords=$(adb exec-out uiautomator dump /dev/tty | sed 's#UI hierchary dumped to: /dev/tty##' | xpath -q -e 'string((//node[@resource-id="com.google.android.apps.photos:id/end_checkmark"]/@bounds)[1])' 2> /dev/null)
nums=$(echo "$coords" | sed 's/\]\[/,/' | tr -d '[]')
IFS=',' read -r x1 y1 x2 y2 <<< "$nums"
avgx=$(( (x1 + x2) / 2 ))
avgy=$(( (y1 + y2) / 2 ))
adb shell input tap $avgx $avgy

coords=$(adb exec-out uiautomator dump /dev/tty | sed 's#UI hierchary dumped to: /dev/tty##' | xpath -q -e 'string((//node[@resource-id="com.google.android.apps.photos:id/photos_allphotos_menu_item_download"]/@bounds)[1])' 2> /dev/null)
nums=$(echo "$coords" | sed 's/\]\[/,/' | tr -d '[]')
IFS=',' read -r x1 y1 x2 y2 <<< "$nums"
avgx=$(( (x1 + x2) / 2 ))
avgy=$(( (y1 + y2) / 2 ))
adb shell input tap $avgx $avgy
