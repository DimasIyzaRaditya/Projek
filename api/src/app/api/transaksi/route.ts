import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all transaksi
export async function GET() {
    const transaksi = await prisma.transaksi.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        produk: true,
      }
    });
}