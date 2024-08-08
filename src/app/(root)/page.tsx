import React from 'react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { AddDocumentBtn } from '@/components/add-document-btn';

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

const DocumentList = (props: DocumentListProps) => {
  const { user } = props;
  const documents = [];

  if (documents.length === 0) {
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
  return <div></div>;
};
