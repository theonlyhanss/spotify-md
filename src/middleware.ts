import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoginPage = RegExp(/login/i).test(request.nextUrl.pathname);
  const error =
    isLoginPage && process.env.SPOTIFY_REFRESH_TOKEN !== undefined
      ? "Your SPOTIFY_REFRESH_TOKEN has been set"
      : undefined === process.env.BASE_URL
      ? "The BASE_URL variable is not set"
      : undefined === process.env.SPOTIFY_CLIENT_ID
      ? "The SPOTIFY_CLIENT_ID variable is not set"
      : undefined === process.env.SPOTIFY_CLIENT_SECRET
      ? "The SPOTIFY_CLIENT_SECRET variable is not set"
      : null;

  if (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 400,
      }
    );
  }
}
