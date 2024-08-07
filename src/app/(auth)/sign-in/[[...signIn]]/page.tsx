import { SignIn } from '@clerk/nextjs';
import React from 'react';

type Props = {};

const SignInPage = (props: Props) => {
  return (
    <div className="auth-page">
      <SignIn />
    </div>
  );
};

export default SignInPage;
