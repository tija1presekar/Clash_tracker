'use server';

import prisma from '@/lib/prismadb';

const getBases = async () => {
  try {
    const bases = await prisma.base.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });

    return bases;
  } catch (error: any) {
    return [];
  }
};

export default getBases;
