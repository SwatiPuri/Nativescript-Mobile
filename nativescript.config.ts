// import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.ECDMApp',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
}
