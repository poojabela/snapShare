import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
    const Router = useRouter();
    const [loading, setLoading] = useState('Sign up')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading('wait...')

        const formData = new FormData(event.target);

        await fetch('api/create', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get('name'),
                userName: formData.get('userName'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        }).then(async () => {
             await Router.push('/home')
        })

    }


     return ( 
        <div className="flex flex-col items-center mt-[3%]">
            <h1 className="my-3 text-[#9933ff] text-2xl">Create account</h1>
            <form onSubmit={ handleSubmit } className="shadow-[4px_4px_20px_5px_rgba(255,255,255,0.2)] rounded-xl flex flex-col items-center w-[600px] py-5">
                    <label className="block mb-3 text-sm" >
                        Name:
                        <input 
                        type="text"
                        name="name"
                        placeholder="Eg. John"
                        required
                        className="block px-8 py-2 rounded-md text-sm border-2 border-[grey]"
                        />
                    </label>
                    <label className="block mb-3 text-sm">
                        Username:
                        <input 
                        type="text"
                        name="userName"
                        placeholder="Eg. John"
                        required
                        className="block px-8 py-2 rounded-md text-sm border-2 border-[grey]"
                        />
                    </label>
                    <label className="block mb-3 text-sm">
                        Email:
                        <input 
                        type="email"
                        name="email"
                        placeholder="Eg. john@gmail.com"
                        required
                        className="block px-8 py-2 rounded-md text-sm border-2 border-[grey]"
                        />
                    </label>
                    <label className="block mb-3 text-sm">
                        Password:
                        <input 
                        type="password"
                        name="password"
                        placeholder="*******"
                        required
                        className="block px-8 py-2 rounded-md text-sm border-2 border-[grey]"
                        />
                    </label>
                    <button type="submit" className="bg-gradient-to-bl from-[#9933ff] to-[#a31081] py-2 px-8 mt-2 rounded-xl ">{ loading }</button>
                    <p className="text-sm mt-3">Already have an account ? <a href="api/auth/signin" className="text-[#2fa9eb]">Sign in</a></p>
            </form>
      </div>
    )
}