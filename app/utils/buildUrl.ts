import { Url } from "~/interface/url";

export function buildUrl(urlObj: Url): string {
  let url = `${urlObj.Scheme}://`;

  // 認証情報がある場合、ユーザー情報を追加
  if (urlObj.User) {
    const userInfo = urlObj.User.Username
      ? `${urlObj.User.Username}${
          urlObj.User.Password ? `:${urlObj.User.Password}` : ""
        }@`
      : "";
    url += userInfo;
  }

  // ホストを追加
  if (urlObj.Host) {
    url += urlObj.Host;
  }

  // パスを追加
  if (urlObj.Path) {
    url += urlObj.Path;
  }

  // 生のクエリ文字列を追加
  if (urlObj.RawQuery) {
    url += `?${urlObj.RawQuery}`;
  }

  // フラグメントを追加
  if (urlObj.Fragment) {
    url += `#${urlObj.Fragment}`;
  }

  return url;
}
