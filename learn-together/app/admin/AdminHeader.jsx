// components/AdminHeader.jsx
'use client';

import { useUser, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function AdminHeader() {
  const { user } = useUser();

  // render deterministic markup on server? Since this is client-only we won't SSR it.
  return (
    <header className="flex items-center justify-between p-4 shadow-lg z-40 ">
      <div className="text-xl font-semibold"><Link href={'/admin'}>Admin Dashboard</Link></div>
      <div className="flex items-center gap-3">
        <span className="text-sm">{user?.firstName} ({user?.publicMetadata?.role})</span>
        <UserButton afterSignOutUrl="/login" />
      </div>
    </header>
  );
}
