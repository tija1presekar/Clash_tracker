import { Base, User } from '@prisma/client';

export type FullBase = Base & {
  user: User | null;
};

export type BaseTypes = {
  type: 'Farm' | 'Trophy' | 'Fun' | 'War' | 'Hybrid' | 'Upgrade';
};