package com.kadradi;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.magus.fblogin.FacebookLoginPackage;
import java.util.Arrays;
import java.util.List;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.barefootcoders.android.react.KDSocialShare.KDSocialShare;
import com.imagepicker.ImagePickerPackage;
public class MainApplication extends Application implements ReactApplication {
   
    private static CallbackManager mCallbackManager = CallbackManager.Factory.create(); //for fbsdk

    protected static CallbackManager getCallbackManager() {
      return mCallbackManager;                                            //fbsdk
    }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new OrientationPackage(),
            new RNFSPackage(),
            new FacebookLoginPackage(),
            new RNGoogleSigninPackage(), // <------ add the package
            new MapsPackage(),
            new KDSocialShare(),
            new FBSDKPackage(mCallbackManager), // fbsdk
            new ImagePickerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
