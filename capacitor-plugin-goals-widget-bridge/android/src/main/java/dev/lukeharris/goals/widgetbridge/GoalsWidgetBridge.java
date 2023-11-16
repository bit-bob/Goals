package dev.lukeharris.goals.widgetbridge;

import android.util.Log;

public class GoalsWidgetBridge {

    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }
}
