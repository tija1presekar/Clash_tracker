'use server';

import prisma from '@/lib/prismadb';

const getUser = async (email: string | null) => {
  try {
    if (!email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error: any) {
    return null;
  }
};

export default getUser;
