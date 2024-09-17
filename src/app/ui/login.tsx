import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

export default function Login() {
    console.log(process.env.AUTH_DISCORD_ID)
    
    return (
        <div className="w-full flex flex-col items-center">
            <span className="text-white text-4xl">Login</span>
            <form className="w-full h-full flex flex-col">
                <div className='border-b-4 relative my-7'>
                    <span>
                        <EnvelopeIcon className='absolute right-1.5 size-6'/>
                    </span>
                    <input id="email" type="email" className='bg-transparent border-none outline-none w-full h-full p-2'></input>
                    <label htmlFor="email" className="absolute top-0 left-1.5">Email</label>
                </div>
                <div className='border-b-4 relative my-7'>
                    <span>
                        <LockClosedIcon className='absolute right-1.5 size-6'/>
                    </span>
                    <input id="password" type="password" className='bg-transparent border-none outline-none w-full h-full p-2'></input>
                    <label htmlFor="password" className="absolute top-0 left-1.5">Password</label>
                </div>
                <button className="py-2 px-4 rounded-3xl bg-primary-500 hover:bg-primary-600 transition-all">Login</button>
                <button className="py-2 px-4 rounded-3xl bg-white hover:bg-gray-600 transition-all mt-4 text-black hover:text-white">
                    <a href="/login/discord">Login with Discord<Image className="inline ml-3" src="/discord.png" alt="" width="24" height="24"/></a>
                </button>
                <div className='py-4 flex justify-center'>
                    <p className="text-center">Don't have an account? <a href="#" className='hover:text-primary-500 transition-all'>Register</a>
                    <br/>or<br/>
                    <a href="#" className='hover:text-primary-500 transition-all'>Enter as guest</a></p>
                </div>
            </form>
        </div>
    );
}