'use server';

import { CollabrativeRoom } from '@/components/collabrative-room';
import { getDocument } from '@/lib/actions/room.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

const DocumentIdPage = async (props: SearchParamProps) => {
  const {
    params: { id },
  } = props;
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });
  if (!room) redirect('/');

  //TODO: Asses the room access and redirect to the home page if the user doesn't have access to the room

  return (
    <main className="w-full">
      <CollabrativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  );
};

export default DocumentIdPage;
