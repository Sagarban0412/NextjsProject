// components/TeacherHeader.jsx
'use client';

import { useUser, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function TeacherHeader() {
  const { user } = useUser();

  // render deterministic markup on server? Since this is client-only we won't SSR it.
  return (
    <header className="flex items-center justify-between p-4 shadow-lg z-40 ">
      <div className="text-sm md:text-xl font-semibold"><Link href={'/admin'}>Teacher Dashboard</Link></div>
      <div className="flex-col flex md:flex-row items-center gap-3">
        <UserButton afterSignOutUrl="/login" />
        <span className="text-[10px]">{user?.firstName}</span>
      </div>
    </header>
  );
}
