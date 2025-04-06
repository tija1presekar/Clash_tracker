'use server';

import prisma from '@/lib/prismadb';

const addDownloads = async (id: string) => {
  await prisma.base.update({
    where: {
      id: id,
    },
    data: {
      downloads: {
        increment: 1,
      },
    },
  });

  const base = await prisma.base.findUnique({
    where: {
      id: id,
    },
    select: {
      downloads: true,
    },
  });

  return base?.downloads;
};

export default addDownloads;
