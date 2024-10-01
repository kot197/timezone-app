import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { FormEvent, useState } from 'react';
import { loginSchema, registerSchema } from '../lib/validationSchema';
import LabelInput from './landing-page/labelInput';
import VerificationCodeInput from './landing-page/verificationCodeInput';

export default function Login() {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

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
                validation = registerSchema.safeParse(formObject);
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

                let response;

                if(!isRegistering) {
                    response = await fetch('/login/email', {
                        method: 'POST',
                        body: formData,
                    });
                } else {
                    response = await fetch('/sign-up', {
                        method: 'POST',
                        body: formData,
                    });
                }
    
                if(!response.ok) {
                    if(response.status == 409 && response.body) {
                        const responseBody = await response.json();

                        setErrors({
                            email: responseBody.message,
                        });
                    }
                } else if (isRegistering) {
                    setIsVerifying(true);
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
            <span className="text-white text-4xl">{isVerifying ? "Verify Your Email Address" : (isRegistering ? "Register" : "Login")}</span>
            {
                isVerifying ? (
                    <form className="w-full h-full flex flex-col" onSubmit={onSubmit}>
                        <p className='text-center mt-7 mb-4'>A six alphanumeric code has been sent to your email.<br/>
                        Enter the code below to verify your email address.</p>
                        <VerificationCodeInput/>
                        <p className='text-center mt-4'>Didn't get the code? Click <button className='text-primary-500 hover:text-primary-600 transition-all'>here</button> to resend the code</p>
                        <button type="submit" className="mt-7 py-2 px-4 rounded-3xl bg-primary-500 hover:bg-primary-600 transition hover:scale-105 ease-in-out">Verify</button>
                    </form>
                ) : !isRegistering ? (
                    <form className="w-full h-full flex flex-col" onSubmit={onSubmit}>
                        <LabelInput name='email' id='email' type='text' labelName='Email'>
                            <EnvelopeIcon/>
                        </LabelInput>
                        {errors.email && <p className='text-red-400 mx-1'>{errors.email}</p>}
                        <LabelInput name='password' id='password' type='password' labelName='Password'>
                            <LockClosedIcon/>
                        </LabelInput>
                        {errors.password && <p className='text-red-400 mx-1'>{errors.password}</p>}
                        <button type="submit" className="mt-7 py-2 px-4 rounded-3xl bg-primary-500 hover:bg-primary-600 transition hover:scale-105 ease-in-out">Login</button>
                        <a className="py-2 px-4 rounded-3xl bg-white hover:bg-gray-600 mt-4 text-black hover:text-white text-center transition hover:scale-105 ease-in-out" href="/login/discord">
                            Login with Discord<Image className="inline ml-3" src="/discord.png" alt="" width="24" height="24"/>
                        </a>
                        <div className='py-4 flex justify-center'>
                            <p className="text-center">Don't have an account? <button onClick={() => setIsRegistering(true)} className='text-primary-500 hover:text-primary-600 transition-all'>Register</button>
                            <br/>or<br/>
                            <a href="#" className='text-primary-500 hover:text-primary-600 transition-all'>Enter as guest</a></p>
                        </div>
                    </form>
                ) : (
                    <form className="w-full h-full flex flex-col" onSubmit={onSubmit}>
                        <LabelInput name='username' id='username' type='text' labelName='Username'>
                            <UserIcon/>
                        </LabelInput>
                        {errors.username && <p className='text-red-400 mx-1'>{errors.username}</p>}
                        <LabelInput name='email' id='email' type='text' labelName='Email'>
                            <EnvelopeIcon/>
                        </LabelInput>
                        {errors.email && <p className='text-red-400 mx-1'>{errors.email}</p>}
                        <LabelInput name='password' id='password' type='password' labelName='Password'>
                            <LockClosedIcon/>
                        </LabelInput>
                        {errors.password && <p className='text-red-400 mx-1'>{errors.password}</p>}
                        <LabelInput name='confirmPassword' id='confirmPassword' type='password' labelName='Confirm Password'>
                            <LockClosedIcon/>
                        </LabelInput>
                        {errors.confirmPassword && <p className='text-red-400 mx-1'>{errors.confirmPassword}</p>}
                        <button type="submit" className="mt-7 py-2 px-4 rounded-3xl bg-primary-500 hover:bg-primary-600 transition hover:scale-105 ease-in-out">Register</button>
                        <div className='py-4 flex justify-center'>
                            <p className="text-center">Already have an account? <button onClick={() => setIsRegistering(false)} className='text-primary-500 hover:text-primary-600 transition-all'>Login</button></p>
                        </div>
                    </form>
                )
            }
        </div>
    );
}