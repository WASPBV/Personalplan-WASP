export default async (req, context) => {
  const res = await context.next();
  try {
    if (!(res.headers.get("content-type") || "").includes("text/html")) return res;
    const u = new URL(req.url);
    const kw = (u.searchParams.get("kw") || "").replace(/\D/g, "").slice(0, 2);
    let html = await res.clone().text();
    html = html.replace('content="og.png"', 'content="' + u.origin + '/og.png"');
    if (kw) html = html.replace('<meta property="og:title" content="Einsatzplan WASP">', '<meta property="og:title" content="Einsatzplan WASP – KW ' + kw + '">');
    const h = new Headers(res.headers);
    h.delete("content-length");
    h.delete("content-encoding");
    h.delete("etag");
    return new Response(html, { status: res.status, headers: h });
  } catch (e) {
    return res;
  }
};
export const config = { path: ["/ansicht.html", "/ansicht"] };
