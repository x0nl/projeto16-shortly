import db from "../config/db.js"

export async function getUser(req, res) {
  const { id } = req.params

  try {
    const { rows: result } = await db.query(
      `SELECT u.id,  u.name,
      SUM(links."visitCount") as "visitCount"
      FROM usuarios u
      LEFT JOIN links ON links."usuarioId"=u.id
      WHERE u.id=$1
      GROUP BY u.id
    `,
      [id]
    )
    const [user] = result

    if (!user) {
      return res.sendStatus(404)
    }

    const shortenedUrls = await db.query(
      `SELECT l.id, l."shortUrl", l.url, l."visitCount"
      FROM links l 
      WHERE "usuarioId"=$1`,
      [id]
    )

    res.status(200).send({
      ...user,
      shortenedUrls: shortenedUrls.rows,
    })
  } catch (e) {
    return res.sendStatus(500)
  }
}