import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default async function Page() {
  const cookieStore  = await cookies()
  const token = cookieStore.get('token')?.value;
  const user = token?jwtDecode(token):null;

  // If no token, redirect to login
  if (!token) {
    redirect('/');
  }
  // If token exists, show waiter page
  return (

    <h1>waiter page</h1>
  );
}
