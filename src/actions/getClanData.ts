'use server'

import { connectToApi, client } from '@/lib/apiConnect';
import { composeClanInfoFromClass } from '@/lib/utils';

export const getClanData = async (tag: string) => {
  try {
    if(!client) await connectToApi();
    const clanClass = await client.getClan(tag);
    
    const clan = composeClanInfoFromClass(clanClass);
    return clan;
  } catch (error) {
    console.log(error);
  }
};