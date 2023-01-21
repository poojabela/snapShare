import { getSession, useSession } from "next-auth/react"
import { useState } from "react";

const Like = ({ postId }) => {
    const [like, setLike] = useState('Like')

    const session = useSession();

    const handleLike = async (event) => {
        event.preventDefault();

        if (session) {
            await fetch('/api/like', {
                method: 'POST',
                body: JSON.stringify({
                    userId: session.data.user.id,
                    postId: postId
                })
            }).then(function () {
                setLike("Liked")
            }).catch(function (error) {
                console.error(error);
            })
        }
    }

    return ( 
        <button onClick={ handleLike } className='bg-[#f55670] my-[15px] mx-[10px] px-[15px] py-[8px] rounded-lg'>{like}</button>
     );
}
 
export default Like;