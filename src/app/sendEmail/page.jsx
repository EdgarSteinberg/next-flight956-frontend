
 "use client"; 

import dynamic from 'next/dynamic';
 
const SendEmail = dynamic(() => import('@/components/sendEmail/sendEmail'), { ssr: false });
export default function RegisterPage() {
    return (
        <>
            <SendEmail/>
        </>
    )
}