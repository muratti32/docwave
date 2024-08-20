'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { Loader } from '@/components/loader';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions';
import { useUser } from '@clerk/nextjs';

export function Provider({ children }: { children: ReactNode }) {
  const authEndPoint =
    process.env.NEXT_PUBLIC_LIVEBLOCKS_AUTH_ENDPOINT || '/api/liveblocks-auth';
  const { user: clerkUser } = useUser();
  return (
    <LiveblocksProvider
      authEndpoint={authEndPoint}
      resolveUsers={async (userIds) => {
        console.log(`halo resolve userIds:`, userIds);
        if (!userIds) return [];
        const users = await getClerkUsers({ userIds });

        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        if (!clerkUser) return [];
        const users = await getDocumentUsers({
          roomId,
          currentUser: clerkUser.emailAddresses[0].emailAddress,
          text,
        });
        return users;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}
