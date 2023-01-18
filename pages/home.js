import { db } from '../db'
import Link from 'next/link'
import Like from '../components/buttons/LikeButton'

export const getServerSideProps = async () => {
    const posts = await db.post.findMany({
        include: {
            user: true,
            likes: true
        }
    })

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    }
}

const Home = ({ posts }) => {

    return ( 
        <div className='flex flex-col items-center'>
            {posts.map(post => (
                <div className='post-container border-solid border-[2px] border-[#212020] bg-[#141414] m-[15px] rounded-xl' key={ post.id }>
                    <Link href={`/user/${ post.user.id }`}><p className='font-pacifico text-[#9933ff] px-[10px] py-[5px]  border-b-[1px] border-[#212020]'>{ post.user.name }</p></Link>
                    <p className='my-[2%] px-[10px]'>{ post.caption }</p>
                    <div className=' h-[300px] w-[400px]'>
                        <img src={ post.imageUrl } alt="image" className='h-[100%] w-[100%] overflow-hidden'/>
                    </div>
                    <div className='flex items-center'>
                        <Like postId={post.id} />
                        <p>{ post.likes?.length }</p>
                    </div>
                </div>
            ))} 
        </div>
     );
}
 
export default Home;