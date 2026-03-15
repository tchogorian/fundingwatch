import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const url = request.nextUrl;

  // Redirect bare debtura.com → www.debtura.com
  if (host === "debtura.com") {
    return NextResponse.redirect(
      new URL(url.pathname + url.search, "https://www.debtura.com"),
      301
    );
  }

  // Redirect old fundingwatch.org → www.debtura.com
  if (host === "fundingwatch.org" || host === "www.fundingwatch.org") {
    return NextResponse.redirect(
      new URL(url.pathname + url.search, "https://www.debtura.com"),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
