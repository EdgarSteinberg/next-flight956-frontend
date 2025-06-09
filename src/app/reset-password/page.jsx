"use client";


import dynamic from 'next/dynamic';

const ResetPassword = dynamic(() => import('@/components/resetPassword/resetPassword'), { ssr: false });
export default function ResetPasswordPage() {
    return (
        <>
            <ResetPassword />
        </>
    )
}