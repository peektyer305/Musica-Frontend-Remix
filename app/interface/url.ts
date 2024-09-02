interface UserInfo {
  Username?: string;
  Password?: string;
}

export interface Url {
  Scheme: string; // スキーム（例: 'http'）
  Opaque?: string; // オペークなURL（例: 'mailto:user@example.com'）
  User?: UserInfo; // 認証情報
  Host?: string; // ホスト（例: 'www.example.com'）
  Path?: string; // パス（例: '/path/to/resource'）
  RawPath?: string; // 生のパス（エンコードされていないパス）
  ForceQuery?: boolean; // 強制的なクエリ
  RawQuery?: string; // 生のクエリ文字列（例: 'key=value&foo=bar'）
  Fragment?: string; // フラグメント（例: 'section1'）
}
