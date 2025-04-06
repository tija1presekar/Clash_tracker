import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await request.json();
    const { name, description, image, townHall, type, baseUrl } = body;

    const newBase = await prisma.base.create({
      data: {
        name,
        description,
        image,
        townHall: townHall.toLowerCase(),
        type: type.map((t: any) => t.label.toLowerCase()),
        baseUrl,
        userId: currentUser?.id ? currentUser.id : null,
      },
    });

    return NextResponse.json(newBase);
  } catch (error: any) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { statusText: 'unauth' });
    }

    const body = await request.json();
    const { id } = body;

    const base = await prisma.base.findUnique({
      where: {
        id,
      },
    });

    if (!base) {
      return new NextResponse('Base not found', { status: 404 });
    }

    const isAlreadyLiked = base.likes.some((like) => like === currentUser?.id);

    if (isAlreadyLiked) {
      const updatedBase = await prisma.base.update({
        where: {
          id,
        },
        data: {
          likes: {
            set: base.likes.filter((like) => like !== currentUser?.id),
          },
        },
      });

      return NextResponse.json(updatedBase);
    } else {
      const updatedBase = await prisma.base.update({
        where: {
          id,
        },
        data: {
          likes: {
            push: currentUser?.id,
          },
        },
      });
      return NextResponse.json(updatedBase);
    }
  } catch (error: any) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
