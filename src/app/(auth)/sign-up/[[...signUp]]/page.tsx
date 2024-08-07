import { SignUp } from '@clerk/nextjs';
import React from 'react';

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <div className="auth-page">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
