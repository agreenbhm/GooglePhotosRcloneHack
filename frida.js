function downloadPhotos(){
    var act;
    Java.choose("com.google.android.apps.photos.home.HomeActivity", {
        onMatch: function (i) { 
            console.log("got instance: " + i); 
            act = i; 
        },
        onComplete: function () { 
            console.log("finished heap search."); 
        }
    });

    var app = Java.use('android.app.ActivityThread').currentApplication();
    var ctx = app.getApplicationContext();

    var checkmark_id = ctx.getResources().getIdentifier("end_checkmark", "id", "com.google.android.apps.photos");
    var checkmark_view = act.findViewById(checkmark_id);

    // cast to the proper TextView class
    var View = Java.use("android.view.View");
    checkmark_view = Java.cast(checkmark_view, View);

    // create a Runnable for runOnUiThread
    var Runnable = Java.use("java.lang.Runnable");

    var MyCheckmarkRunnable = Java.registerClass({
        name: 'com.frida.MyCheckmarkRunnable',
        implements: [Runnable],
        methods: {
            run: function () {
            var clicked = checkmark_view.performClick();
            console.log("performClick returned: " + clicked);
            }
        }
    });

    act.runOnUiThread(MyCheckmarkRunnable.$new());
    Thread.sleep(2);

    var download_id = ctx.getResources().getIdentifier("photos_allphotos_menu_item_download", "id", "com.google.android.apps.photos");
    var download_view = act.findViewById(download_id);

    try{
        download_view = Java.cast(download_view, View);

        var MyRunnableDownload = Java.registerClass({
            name: 'com.frida.MyRunnableDownload',
            implements: [Runnable],
            methods: {
                run: function () {
                var clicked = download_view.performClick();
                console.log("performClick returned: " + clicked);
                }
            }
        });
        act.runOnUiThread(MyRunnableDownload.$new());
    }catch(err){
        if(download_view == null){
            console.log("download_view is null. Everything downloaded?");
        }else{
            console.log("error: " + err);
        }
        act.finish();
    }
}

Java.perform(function () {
    setTimeout(downloadPhotos, 3000);
});
