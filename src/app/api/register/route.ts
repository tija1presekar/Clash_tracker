import bcrypt from 'bcrypt';

import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { RegisterFormValues } from '@/app/auth/page';

export async function POST(request: Request) {
  const body: RegisterFormValues = await request.json();
  const { email, name, password, clashOfClansId } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      clashOfClansId,
    },
  });

  return NextResponse.json(user);
}
