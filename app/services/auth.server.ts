import { Authenticator } from "remix-auth";
import {createCookieSessionStorage} from "react-router"
import { Auth0Strategy } from "remix-auth-auth0";

//ユーザータイプの定義
export type User = {
    id: string;
    email: string;
    name: string;
    picture: string;
    accessToken: string | null;
    refreshToken: null;
};

//セッションストレージの設定
export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "musica_session",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: ["Secret"],
        maxAge: 60 * 60 * 24 * 30, // 30日
        secure: process.env.NODE_ENV === "production",
    },
});

//ユーザーセッションのヘルパー関数
export async function getUserSession(request: Request) {
    return sessionStorage.getSession(request.headers.get("Cookie"));
}

//セッションへのユーザー情報保存
export async function setUserSession(
    request: Request,
    user: User,
    userData: any
){
    const session = await getUserSession(request);
    session.set("userId", user.id);
    session.set("userEmail", user.email);
    session.set("userData", userData);

    return session
}

//認証インスタンスの作成
export const authenticator = new Authenticator<User>();

//セッションからユーザー情報を所得する関数
export async function isAuthenticated(request: Request) {
    const session = await getUserSession(request);
    const userId = session.get("userId");
    const userEmail = session.get("userEmail");
    const userData = session.get("userData");
    if (!userId || !userEmail) {
        return null;
    }
    return userData as User;
}

//Auth0ストラテジーの設定
const auth0Strategy = new Auth0Strategy<User>(
    {
        domain: process.env.AUTH0_DOMAIN || " ",
        clientId: process.env.AUTH0_CLIENT_ID || " ",
        clientSecret: process.env.AUTH0_CLIENT_SECRET || " ",
        redirectURI: process.env.AUTH0_CALLBACK_URL || " ",
        scopes: ["openid", "profile", "email"],
    },
     async ({ tokens }) => {
        const userResponse = await fetch(
            `https://${process.env.AUTH0_DOMAIN}/userinfo`,
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken()}`,
                },
            },
        );
        if (!userResponse.ok) {
            throw new Error("Failed to fetch user information from Auth0");
        }
        const userData = await userResponse.json();
        return {
            id: userData.sub,
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
            accessToken: tokens.accessToken(),
            refreshToken: null,
        };
     }
    );
//認証インスタンスにAuth0ストラテジーを追加
authenticator.use(auth0Strategy);

//ユーザー認証ヘルパー関数
export async function requireUser(request: Request, redirectTo: string = "/login") {
    try {
        //まずセッションから認証済みユーザーを確認
        const sessionUser = await isAuthenticated(request);
        if (sessionUser) {
            return sessionUser;
        }
        //セッションにユーザーがいない場合、認証を試みる
        const user = await authenticator.authenticate("auth0", request);
        if (user) {
            //認証成功したらセッションを更新
            const session = await setUserSession(request, user, user);
            throw new Response(null, {
                status: 302,
                headers: {
                    Location: request.url,
                    "Set-Cookie": await sessionStorage.commitSession(session),
                },
            });
        }
        return user;
    } catch (error) {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams([["redirectTo", url.pathname]]);
        throw new Response(null, {
            status: 302,
            headers: {
                Location: `${redirectTo}?${searchParams.toString()}`,
            },
        });
    }
}