import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET transaksi by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {}
