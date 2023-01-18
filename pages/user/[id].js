import { db } from '../../db'

export const getServerSideProps = async ({ params }) => {
    const user = await db.user.findUnique({
      where: {
        id: params.id
      },
      include: {
        posts: true
      }  
    });

    return {  
      props: {
        user: JSON.parse(JSON.stringify(user))
      }
    }
}

const Profile = ({ user }) => {

    return ( 
      <div className='flex flex-col items-center mt-[2%]'>
        <h1 className='mb-[2%] text-[25px] font-pacifico text-[#9933ff]'>{ user.name }</h1>
        <div className='flex'>
          {user.posts.map(post => (
            <div className='w-[300px] h-[300px]  ml-[3%]'>
              <img src={post.imageUrl} alt="" className='w-[100%] h-[100%]'/>
            </div>
          ))}
        </div>
      </div>
     );
}
 
export default Profile;