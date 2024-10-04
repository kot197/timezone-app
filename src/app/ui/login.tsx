import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { FormEvent, useState } from 'react';
import { loginSchema, registerSchema, verificationCodeSchema } from '../lib/validationSchema';
import LabelInput from './landing-page/labelInput';
import VerificationCodeInput from './landing-page/verificationCodeInput';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const router = useRouter();

    function validateForm(formObject: Record<string, any>) {
        const schema = isVerifying ? verificationCodeSchema : isRegistering ? registerSchema : loginSchema;
        const validation = schema.safeParse(formObject);

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
            return false;
        }

        console.log("No validation error: ", formObject);
        setErrors({});
        return true;
    }

    async function submitForm(formData: FormData, url: string) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if(!response.ok) {
                if(response.status == 409 && response.body) {
                    const responseBody = await response.json();

                    setErrors({ email: responseBody.message });
                }
                if(response.status == 401 && response.body) {
                    const responseBody = await response.json();

                    setIsVerifying(true);
                }
                return null;
            }

            return response.json;
        } catch (error) {

        }
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);
        // Convert FormData to a plain object for easier inspection
        const formObject = Object.fromEntries(formData.entries());
        // Log the form data right from the start
        console.log("Form Data at Start:", formObject);

        const isValid = validateForm(formObject);

        if(!isValid) return;

        if(isVerifying) {
            const result = await submitForm(formData, '/email-verification');
            if (result) {
                router.push('/web-app/home');
            }   
        } else if(isRegistering) {
            const result = await submitForm(formData, '/sign-up');
            if (result) {
                setIsVerifying(true); // Switch to email verification
            }
        } else {
            const result = await submitForm(formData, '/login/email');
            if (result) {
                router.push('/web-app/home');
            }
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
                        {errors.verificationCode && <p className='text-red-400 mx-1 text-center mt-2'>{errors.verificationCode}</p>}
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