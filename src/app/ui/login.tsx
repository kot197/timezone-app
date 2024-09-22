import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { login, signup } from '../lib/actions';
import { useEffect } from 'react';

export default function Login({isRegistering, openRegister, closeRegister}: {isRegistering: boolean, openRegister: () => void, closeRegister: () => void}) {
    return (
        <div className="w-full flex flex-col items-center">
            <span className="text-white text-4xl">{isRegistering? "Register" : "Login" }</span>
            {
                !isRegistering ? (
                    <form className="w-full h-full flex flex-col" action="/login/email" method='post'>
                        <div className='border-b-4 relative my-7'>
                            <span>
                                <EnvelopeIcon className='absolute right-1.5 size-6'/>
                            </span>
                            <input name="email" id="email" type="text" className='bg-transparent border-none outline-none w-full h-full p-2'></input>
                            <label htmlFor="email" className="absolute top-0 left-1.5">Email</label>
                        </div>
                        <div className='border-b-4 relative my-7'>
                            <span>
                                <LockClosedIcon className='absolute right-1.5 size-6'/>
                            </span>
                            <input name="password" id="password" type="password" className='bg-transparent border-none outline-none w-full h-full p-2'></input>
                            <label htmlFor="password" className="absolute top-0 left-1.5">Password</label>
                        </div>
                        <button type="submit" className="py-2 px-4 rounded-3xl bg-primary-500 hover:bg-primary-600 transition-all">Login</button>
                        <a className="py-2 px-4 rounded-3xl bg-white hover:bg-gray-600 transition-all mt-4 text-black hover:text-white text-center" href="/login/discord">
                            Login with Discord<Image className="inline ml-3" src="/discord.png" alt="" width="24" height="24"/>
                        </a>
                        <div className='py-4 flex justify-center'>
                            <p className="text-center">Don't have an account? <button onClick={openRegister} className='hover:text-primary-500 transition-all'>Register</button>
                            <br/>or<br/>
                            <a href="#" className='hover:text-primary-500 transition-all'>Enter as guest</a></p>
                        </div>
                    </form>
                ) : (
                    <form className="w-full h-full flex flex-col" action={signup}>
                        <div className='border-b-4 relative my-7'>
                            <span>
                                <EnvelopeIcon className='absolute right-1.5 size-6'/>
                            </span>
                            <input name="email" id="email" type="text" className='bg-transparent border-none outline-none w-full h-full p-2'></input>
                            <label htmlFor="email" className="absolute top-0 left-1.5">Email</label>
                        </div>
                        <div className='border-b-4 relative my-7'>
                            <span>
                                <LockClosedIcon className='absolute right-1.5 size-6'/>
                            </span>
                            <input name="password" id="password" type="password" className='bg-transparent border-none outline-none w-full h-full p-2'></input>
                            <label htmlFor="password" className="absolute top-0 left-1.5">Password</label>
                        </div>
                        <button type="submit" className="py-2 px-4 rounded-3xl bg-primary-500 hover:bg-primary-600 transition-all">Register</button>
                        <div className='py-4 flex justify-center'>
                            <p className="text-center">Already have an account? <button onClick={closeRegister} className='hover:text-primary-500 transition-all'>Login</button></p>
                        </div>
                    </form>
                )
            }
        </div>
    );
}