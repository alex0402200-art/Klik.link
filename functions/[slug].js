// functions/[slug].js
// Route otomatis: GET /:slug -> redirect ke URL asli

export async function onRequestGet(context) {
  const { params, env } = context;
  const slug = params.slug;

  const row = await env.DB.prepare(
    "SELECT url FROM links WHERE slug = ?"
  )
    .bind(slug)
    .first();

  if (row) {
    return Response.redirect(row.url, 302);
  }
  return new Response("Link tidak ditemukan", { status: 404 });
}
