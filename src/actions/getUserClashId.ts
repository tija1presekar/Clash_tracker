'use server';

import prisma from '@/lib/prismadb';

const getUserClashId = async (email: string | null) => {
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

    return user.clashOfClansId;
  } catch (error: any) {
    return null;
  }
};

export default getUserClashId;
