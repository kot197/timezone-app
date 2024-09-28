import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { login, signup } from '../lib/actions';
import { FormEvent, useState } from 'react';
import { loginSchema } from '../lib/validationSchema';

export default function Login({isRegistering, openRegister, closeRegister}: {isRegistering: boolean, openRegister: () => void, closeRegister: () => void}) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        try {
            const formData = new FormData(event.currentTarget);

            // Convert FormData to a plain object for easier inspection
            const formObject = Object.fromEntries(formData.entries());

            // Log the form data right from the start
            console.log("Form Data at Start:", formObject);

            let validation;

            if(!isRegistering) {
                validation = loginSchema.safeParse(formObject);
            } else {
                validation = loginSchema.safeParse(formObject);
            }

            console.log(validation.error?.errors);

            if(!validation.success) {
                const errorMessages = validation.error.errors.reduce((accumulator, error) => {
                    const field = error.path[0]; // 'email' or 'password'

                    // Only set the error if it doesn't already exist in the accumulator (i.e., surface error)
                    if (!accumulator[field]) {
                        accumulator[field] = error.message;
                    }

                    return accumulator;
                }, {} as {[key: string]: string});

                console.log("Validation Errors:", errorMessages);
                setErrors(errorMessages);
            } else {
                console.log("No validation error: ", formObject);
                setErrors({});

                const response = await fetch('/login/email', {
                    method: 'POST',
                    body: formData,
                });
    
                if(!response.ok) {
                    throw new Error('Failed to submit the data. Please try again.');
                }
            
                // Handle response if necessary
                const data = await response.json()
                // ...
            }
        } catch (error) {

        }
    }

    return (
        <div className="w-full flex flex-col items-center">
            <span className="text-white text-4xl">{isRegistering? "Register" : "Login" }</span>
            {
                !isRegistering ? (
                    <form className="w-full h-full flex flex-col" onSubmit={onSubmit}>
                        <div className='border-b-4 relative mt-9 mb-2'>
                            <span>
                                <EnvelopeIcon className='absolute right-1.5 top-1 size-6'/>
                            </span>
                            <input name="email" id="email" type="text" className='bg-transparent border-none focus:ring-primary-500 focus:outline-none focus:ring w-full h-full p-2 peer'></input>
                            <label htmlFor="email" className="absolute top-0 left-1.5 peer-focus:scale-95 peer-focus:-translate-y-7 transition ease-in-out">Email</label>
                        </div>
                        {errors.email && <p className='text-red-400'>{errors.email}</p>}
                        <div className='border-b-4 relative mt-7 mb-2'>
                            <span>
                                <LockClosedIcon className='absolute right-1.5 top-1 size-6'/>
                            </span>
                            <input name="password" id="password" type="password" className='bg-transparent border-none focus:ring-primary-500 focus:outline-none focus:ring w-full h-full p-2 peer'></input>
                            <label htmlFor="password" className="absolute top-0 left-1.5 peer-focus:scale-95 peer-focus:-translate-y-7 transition ease-in-out">Password</label>
                        </div>
                        {errors.password && <p className='text-red-400'>{errors.password}</p>}
                        <button type="submit" className="mt-7 py-2 px-4 rounded-3xl bg-primary-500 hover:bg-primary-600 transition hover:scale-105 ease-in-out">Login</button>
                        <a className="py-2 px-4 rounded-3xl bg-white hover:bg-gray-600 mt-4 text-black hover:text-white text-center transition hover:scale-105 ease-in-out" href="/login/discord">
                            Login with Discord<Image className="inline ml-3" src="/discord.png" alt="" width="24" height="24"/>
                        </a>
                        <div className='py-4 flex justify-center'>
                            <p className="text-center">Don't have an account? <button onClick={openRegister} className='hover:text-primary-500 transition-all'>Register</button>
                            <br/>or<br/>
                            <a href="#" className='hover:text-primary-500 transition-all'>Enter as guest</a></p>
                        </div>
                    </form>
                ) : (
                    <form className="w-full h-full flex flex-col" onSubmit={onSubmit}>
                        <div className='border-b-4 relative mt-9 mb-2'>
                            <span>
                                <EnvelopeIcon className='absolute right-1.5 top-1 size-6'/>
                            </span>
                            <input name="email" id="email" type="text" className='bg-transparent border-none focus:ring-primary-500 focus:outline-none focus:ring w-full h-full p-2 peer'></input>
                            <label htmlFor="email" className="absolute top-0 left-1.5 peer-focus:scale-95 peer-focus:-translate-y-7 transition ease-in-out">Email</label>
                        </div>
                        {errors.email && <p className='text-red-400'>{errors.email}</p>}
                        <div className='border-b-4 relative mt-7 mb-2'>
                            <span>
                                <LockClosedIcon className='absolute right-1.5 top-1 size-6'/>
                            </span>
                            <input name="password" id="password" type="password" className='bg-transparent border-none focus:ring-primary-500 focus:outline-none focus:ring w-full h-full p-2 peer'></input>
                            <label htmlFor="password" className="absolute top-0 left-1.5 peer-focus:scale-95 peer-focus:-translate-y-7 transition ease-in-out">Password</label>
                        </div>
                        {errors.password && <p className='text-red-400'>{errors.password}</p>}
                        <button type="submit" className="mt-7 py-2 px-4 rounded-3xl bg-primary-500 hover:bg-primary-600 transition hover:scale-105 ease-in-out">Register</button>
                        <div className='py-4 flex justify-center'>
                            <p className="text-center">Already have an account? <button onClick={closeRegister} className='hover:text-primary-500 transition-all'>Login</button></p>
                        </div>
                    </form>
                )
            }
        </div>
    );
}