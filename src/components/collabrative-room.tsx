'use client';
import { ActiveCollabrators } from '@/components/active-collabrators';
import { Editor } from '@/components/editor/Editor';
import { Header } from '@/components/header';
import { Loader } from '@/components/loader';
import { Input } from '@/components/ui/input';
import { updateDocument } from '@/lib/actions/room.actions';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export const CollabrativeRoom = (props: CollaborativeRoomProps) => {
  const { roomId, roomMetadata, users, currentUserType } = props;
  const [editing, setEditing] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(
    roomMetadata?.title || 'Untitled Document',
  );
  const [loading, setLoading] = useState(false);
  const contafinerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      setLoading(true);
      try {
        if (documentTitle !== roomMetadata?.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          if (updatedDocument) {
            setEditing(false);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error updating the document title', error);
        setLoading(false);
        setEditing(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        contafinerRef.current &&
        !contafinerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
      }
    };
    document.addEventListener('click', handleClickOutSide);

    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, [documentTitle, roomId]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div>
          <Header>
            <div className=" flex w-fit items-center justify-between gap-2">
              {editing ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="enter document title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="document-title-input "
                />
              ) : (
                <>
                  <p className="document-title">{documentTitle} </p>
                </>
              )}
              {currentUserType === 'editor' && !editing && (
                <Image
                  src={'/assets/icons/edit.svg'}
                  alt="edit"
                  width={24}
                  height={24}
                  className="cursor-pointer "
                  onClick={() => setEditing(true)}
                />
              )}
              {currentUserType !== 'editor' && (
                <p className="view-only-tag">View only</p>
              )}

              {loading && <p className="text-sm text-gray-400">Saving...</p>}
            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollabrators />
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};
