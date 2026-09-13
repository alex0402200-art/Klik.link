// functions/api/shorten.js
// Route otomatis: POST /api/shorten

function randomSlug(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body harus JSON" }, { status: 400 });
  }

  const targetUrl = body.url;
  if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
    return Response.json(
      { error: "URL tidak valid, harus diawali http:// atau https://" },
      { status: 400 }
    );
  }

  let slug = (body.slug || "").trim();
  if (slug) {
    if (!/^[a-zA-Z0-9_-]{1,32}$/.test(slug)) {
      return Response.json(
        { error: "Backhalf hanya boleh huruf, angka, - dan _" },
        { status: 400 }
      );
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const candidate = randomSlug();
      const existing = await env.DB.prepare(
        "SELECT 1 FROM links WHERE slug = ?"
      )
        .bind(candidate)
        .first();
      if (!existing) {
        slug = candidate;
        break;
      }
    }
  }

  try {
    await env.DB.prepare(
      "INSERT INTO links (slug, url, created_at) VALUES (?, ?, ?)"
    )
      .bind(slug, targetUrl, Date.now())
      .run();
  } catch (e) {
    return Response.json(
      { error: "Backhalf sudah dipakai, coba yang lain" },
      { status: 409 }
    );
  }

  const url = new URL(request.url);
  return Response.json({
    slug,
    short_url: `${url.origin}/${slug}`,
  });
}
