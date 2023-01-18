import { db } from '../../db'

export default async function handler (req, res) {

    const body = JSON.parse(req.body);

    const like = await db.like.create({
        data: {
           userId: body.userId,
           postId: body.postId 
        }
    })
     res.send(like)
}