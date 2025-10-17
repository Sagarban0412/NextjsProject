
import { clerkClient } from '@clerk/nextjs/server';

export async function setUserRole(userId, role) {
  return await clerkClient.users.updateUser(userId, {
    publicMetadata: { role } // or roles: ['admin']
  });
}
