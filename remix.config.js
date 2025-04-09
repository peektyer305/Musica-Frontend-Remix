// remix.config.js
module.exports = {
  // ソースコードが配置されているディレクトリ。通常は "app" でOKです。
  appDirectory: "app",
  // サーバー側のビルド出力先
  serverBuildDirectory: "build",
  // 静的アセットが置かれているパス
  publicPath: "/build/",
  // ルートファイルはデフォルトで app/routes 内にあるので、特別な設定は不要
};
