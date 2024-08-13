import React from 'react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { AddDocumentBtn } from '@/components/add-document-btn';
import { getDocuments } from '@/lib/actions/room.actions';
import Link from 'next/link';
import { dateConverter } from '@/lib/utils';

const Main = async (props: HeaderProps) => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="">Notification</div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <DocumentList user={user} />
    </main>
  );
};

export default Main;

interface DocumentListProps {
  user: User;
}

const DocumentList = async (props: DocumentListProps) => {
  const { user } = props;
  const roomDocuments = await getDocuments(user.emailAddresses[0].emailAddress);
  if (roomDocuments.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="text-2xl font-bold">No documents found</div>
        <Image
          src={'/assets/icons/doc.svg'}
          alt="Document icon"
          width={40}
          height={40}
          className="mx-auto"
        />
        <AddDocumentBtn
          userId={user.id}
          email={user.emailAddresses[0].emailAddress}
        />
      </div>
    );
  }
  return (
    <div className="document-list-container">
      <div className="document-list-title">
        <h3 className="text-28-semibold ">All Documents</h3>
      </div>
      <ul className="document-ul">
        {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
          <li key={id} className="document-list-item">
            <Link
              href={`/documents/${id}`}
              className="flex flex-1 items-center gap-4"
            >
              <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                <Image
                  src={'/assets/icons/doc.svg'}
                  alt="file"
                  width={40}
                  height={40}
                />
              </div>
              <div className="space-y-1">
                <p className="line-clamp-1 text-lg">{metadata.title}</p>
                <p className="text-sm text-blue-100 font-light">
                  Created about {dateConverter(createdAt)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
