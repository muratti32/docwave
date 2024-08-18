'use server';

import { CollabrativeRoom } from '@/components/collabrative-room';
import { getDocument } from '@/lib/actions/room.actions';
import { getClerkUsers } from '@/lib/actions/user.actions';
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
  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });

  const userData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer',
  }));
  const currentUserType = room.usersAccesses[
    clerkUser.emailAddresses[0].emailAddress
  ].includes('room:write')
    ? 'editor'
    : 'viewer';
  //TODO: Asses the room access and redirect to the home page if the user doesn't have access to the room

  return (
    <main className="w-full">
      <CollabrativeRoom
        users={userData}
        currentUserType={currentUserType}
        roomId={id}
        roomMetadata={room.metadata}
      />
    </main>
  );
};

export default DocumentIdPage;
