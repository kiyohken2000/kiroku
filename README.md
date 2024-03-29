```

// ビルド:開発用バイナリ
eas build --profile development --platform ios
eas build --profile development --platform android

// ビルド:内部配布バイナリ
eas build --profile preview --platform ios
eas build --profile preview --platform android

app.jsonを確認(Android/iPhoneでそれぞれ違う)
- name
- icon
- splash

// ビルド:プロダクション
eas build --profile production --platform ios
eas build --profile production --platform android

// OTAアップデート
expo publish --release-channel internal
expo publish --release-channel production
eas update --channel preview --message "Updating the app"
eas update --channel production --message "Updating the app"

eas update --branch preview --message "Updating the app"
eas update --branch production --message "Updating the app"

// iOS用:デバイス登録(開発用と内部配布バイナリのインストールに必須)
eas device:create
// 登録済みiPhoneの表示
eas device:list

// パッケージの変更を保存
npx patch-package [package name]
```

**プライバシーポリシー**

https://kiyohken2000.github.io/kiroku/ja
https://kiyohken2000.github.io/kiroku/doui