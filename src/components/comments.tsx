import { cn } from '@/lib/utils';
import { ThreadData } from '@liveblocks/node';
import { useIsThreadActive } from '@liveblocks/react-lexical';
import { Composer, Thread } from '@liveblocks/react-ui';
import { useThreads } from '@liveblocks/react/suspense';
import React from 'react';

type Props = {};

export const Comments = (props: Props) => {
  const { threads } = useThreads();
  if (!threads) {
    return <div>Loading...</div>;
  }
  return (
    <div className="comments-container">
      <Composer />
      {threads.map((thread) => (
        <ThreadsWrapper key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

interface ThreadsWrapperProps {
  thread: ThreadData;
}

const ThreadsWrapper = (props: ThreadsWrapperProps) => {
  const { thread } = props;
  const isActive = useIsThreadActive(thread.id);

  return (
    <Thread
      thread={thread}
      data-state={isActive ? 'active' : null}
      className={cn(
        `comment-thread border ${isActive && '!border-blue-500 shadow-lg'} ${
          thread.resolved && 'opacity-40'
        } `,
      )}
    />
  );
};
