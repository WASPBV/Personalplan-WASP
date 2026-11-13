export default async (req, context) => {
  const res = await context.next();
  const u = new URL(req.url);
  const kw = (u.searchParams.get("kw") || "").replace(/\D/g, "").slice(0, 2);
  let html = await res.text();
  html = html.replace('content="og.png"', 'content="' + u.origin + '/og.png"');
  if (kw) html = html.replace('<meta property="og:title" content="Einsatzplan WASP">', '<meta property="og:title" content="Einsatzplan WASP – KW ' + kw + '">');
  const h = new Headers(res.headers);
  h.delete("content-length");
  return new Response(html, { status: res.status, headers: h });
};
export const config = { path: "/ansicht.html" };
