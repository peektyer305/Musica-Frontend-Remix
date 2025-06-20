import { Link, Links, LoaderFunctionArgs, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation } from "react-router";
import Header from "./components/Header";
import "./tailwind.css";
import { authenticator, isAuthenticated } from "./services/auth.server";

export async function loader({request}: LoaderFunctionArgs) {
  //ここで認証やデータの取得を行うことができます。
  //例えば、ユーザー情報を取得してコンテキストに渡すことができます。
  //ユーザーの認証状態を確認
  try {
    //まずはセッションからユーザー情報を取得
    let user = await isAuthenticated(request);
    if (user) {
      //ユーザーが認証されていない場合はnullを返す
      return { user, isAuthenticated: true };
    }

    try {
      user = await authenticator.authenticate("auth0", request);
      return { user, isAuthenticated: true };
    } catch (authError) {
      // 認証に失敗した場合はnullを返す
      return { user: null, isAuthenticated: false };
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return { user: null, isAuthenticated: false };
  }
  
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const {isAuthenticated} = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header isLogin={isAuthenticated} />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
