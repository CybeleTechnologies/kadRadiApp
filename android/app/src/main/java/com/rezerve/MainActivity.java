package com.kadradi;
import android.content.Intent;
import com.facebook.react.ReactActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import
public class MainActivity extends ReactActivity {
    private PermissionListener listener; // <- add this attribute
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);                               // fbsdk
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    public void setPermissionListener(PermissionListener listener)
    {
        this.listener = listener;
    }
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
    {
        if (listener != null)
        {
        listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    protected String getMainComponentName() {
        return "kadradi";
    }
}
