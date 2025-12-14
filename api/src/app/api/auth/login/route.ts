import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find user with password
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        password: true,
      },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    // Return user data without password
    return NextResponse.json({
      data: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}
