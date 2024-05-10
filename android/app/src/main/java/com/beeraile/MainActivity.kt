package com.beeraile

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle;

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "beeraile"

  private val fabricEnabled = true

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
}
