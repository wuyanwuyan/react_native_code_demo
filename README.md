# react_native_code_demo
react_native_code_demo




### 打包发布
#### 安卓：
React-native bundle --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.jsbundle --platform android --assets-dest ./android/app/src/main/res/ --dev false

cd android && ./gradlew assembleRelease



claudedeMacBook-Pro:android claude$ code-push app add cqnews android react-native
Successfully added the "cqnews" app, along with the following default deployments:
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ vn1L8Hn4AIVLmbImJOxyUafkKFAaf09d6585-c32c-4359-8b28-0c1d7984bedb │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ 4GKGaBAl5rocSNvE2r8jULmBMRvkf09d6585-c32c-4359-8b28-0c1d7984bedb │
└────────────┴─────────────────────────────── ───────────────────────────────────┘
claudedeMacBook-Pro:android claude$ react-native link react-native-code-push


code-push release-react cqnews-android android --t 1.0.0 --dev false --d Production --des "rename" --m true
CodePush默认是更新 Staging 环境的，如果发布生产环境的更新包，需要指定--d参数：--d Production ，如果发布的是强制更新包，需要加上 --m true强制更新

查看发布历史
code-push deployment history cqnews-android Production
code-push deployment ls cqnews-android -k

