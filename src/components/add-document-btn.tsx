'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { createDocument } from '@/lib/actions/room.actions';
import { useRouter } from 'next/navigation';

export const AddDocumentBtn = (props: AddDocumentBtnProps) => {
  const { userId, email } = props;
  const router = useRouter();
  const handleAddDocument = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) {
        router.push(`/documents/${room.id}`);
      }
    } catch (error: any) {
      console.log(`halo create document error:`, error);
    }
  };

  return (
    <Button
      type="submit"
      onClick={handleAddDocument}
      className="gradient-blue flex gap-1 shadow-md"
    >
      <Image
        alt="Document icon"
        src={'/assets/icons/add.svg'}
        width={24}
        height={24}
      />
      <p className="hidden sm:block">Start a blank document</p>
    </Button>
  );
};
