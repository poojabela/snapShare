import Link from "next/link";
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react";

const Navbar = () => {

    const { data: session } = useSession()

    const logout = () => {
        signOut({
            callbackUrl: '/'
        })
    }

    return ( 
        <nav className="p-3  flex justify-between items-center bg-black border-[#212020] border-solid border-b-[1px] sticky top-0">
            <h1 className="text-[#9933ff] text-lg font-pacifico text-[30px]">SnapShare</h1>
            <div>
                <Link href="/home" className="pr-5 hover:text-[#9933ff]">Home</Link>
                <Link href="/post" className="pr-5 hover:text-[#9933ff]">Post</Link>
                { !session && <Link href="api/auth/signin" className="bg-gradient-to-bl from-[#9933ff] to-[#a31081] p-2 rounded-lg">Sign in</Link> }
                { session && <button onClick={ logout } className='bg-gradient-to-bl from-[#9933ff] to-[#a31081] p-2 rounded-lg'>Sign out</button> }
            </div>
        </nav>
     );
}
 
export default Navbar;