'use client';

import { Editor } from '@/components/editor/Editor';
import { Header } from '@/components/header';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from '@clerk/clerk-react';
import React from 'react';

type Props = {};

const DocumentIdPage = (props: Props) => {
  return (
    <div>
      <Header>
        <div className="flex w-fit items-center justify-center gap-2">
          <p className="document-title">Share</p>
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
  );
};

export default DocumentIdPage;
