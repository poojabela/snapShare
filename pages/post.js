import { storage } from '../firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

const Post = () => {
  const user = useSession()
  console.log(user)
  const Router = useRouter()

  const handleSubmit = async (event) => {

      try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const imageFile = formData.get('image');
      console.log(imageFile)
      
        if (imageFile) {
          const imageRefs = ref(storage, `${imageFile.name}-${Date.now()}`)
          const upload = await uploadBytes(imageRefs, imageFile)
          const uploadUrl = await getDownloadURL(upload.ref)

          await fetch('api/post', {
            method: 'POST',
            body: JSON.stringify({
              userID: user.data.id,
              imageUrl: uploadUrl,
              caption: formData.get('caption'),
            }),
          }).then(async () => {
            Router.push('/home')
          })
        }
      }catch (error) {
        console.error(error);
      }
    }

  return ( 
      <div className='flex flex-col items-center mt-[3%]'>
          <h1 className='font-pacifico text-[#9933ff] text-[20px] mb-[2%]'>Post</h1>  
          <form onSubmit={ handleSubmit } className='flex flex-col'>
              <input 
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className='mb-[5%]'
              />
              <input 
              type="text"
              name="caption"
              id="caption"
              placeholder="write caption..."
              className='rounded-2xl px-[10px] py-[5px] text-[#000] mb-[5%]' 
              />
              <button type="submit" disabled={!user.data} className='bg-gradient-to-bl from-[#9933ff] to-[#a31081] py-2 px-8 rounded-xl'>Post ❤</button>
          </form>
          {user && <p className='mt-[2%]'>Sign-in to post</p>}
      </div>
    );
}
 
export default Post;