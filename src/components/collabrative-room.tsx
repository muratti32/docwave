'use client';
import { ActiveCollabrators } from '@/components/active-collabrators';
import { Editor } from '@/components/editor/Editor';
import { Header } from '@/components/header';
import { Loader } from '@/components/loader';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import React from 'react';

type Props = {};

export const CollabrativeRoom = (props: CollaborativeRoomProps) => {
  const { roomId } = props;
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div>
          <Header>
            <div className="flex w-fit items-center justify-center gap-2">
              <p className="document-title">Share</p>
              <div>
                <ActiveCollabrators />
              </div>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};
