import { db } from '../../db'

export default async function handler (req, res) {

    const body = JSON.parse(req.body);

    const newPost = await db.post.create({
        data: {
            user: {
                connect: {
                    id: body.userID
                }
            },
            imageUrl: body.imageUrl,
            caption: body.caption
        }
    })

    res.send(newPost)
}