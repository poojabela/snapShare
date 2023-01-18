import { db } from '../../db';

export default async function handler (req, res) {

    const body = JSON.parse(req.body);

    const createUser = await db.user.create({
        data: {
            name: body.name,
            userName: body.userName,
            email: body.email,
            password: body.password
        }
    })
}