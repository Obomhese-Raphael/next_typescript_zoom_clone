/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { Metadata } from 'next';

interface PageProps {
    params: { id: string };
}

const Meeting = ({ params: { id } }: PageProps) => {
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { user, isLoaded } = useUser();
    const { call, isCallLoading } = useGetCallById(id);

    if (!isLoaded || isCallLoading) return <Loader />;
    return (
        <main className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                    ) : (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    );
};

export default Meeting;
