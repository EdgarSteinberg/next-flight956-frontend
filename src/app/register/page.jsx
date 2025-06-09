 "use client"; 

import dynamic from 'next/dynamic';

const Register = dynamic(() => import('@/components/register/register'), { ssr: false });
export default function RegisterPage() {
    return (
        <>
            <Register />
        </>
    )
}