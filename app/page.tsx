'use client';

import { Button } from '@/components/ui/button';
import { GeminiProvider } from '@/contexts/GeminiContext';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Home!</h1>
      <nav className="flex gap-5">
        <Link href={'/numbers/practice'}>
          <Button>Numbers</Button>
        </Link>
        <Link href={'/pronounce/practice'}>
          <Button>Pronounce</Button>
        </Link>
      </nav>
    </>
  );
}
