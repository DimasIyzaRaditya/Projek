import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all transaksi
export async function GET() {
  try {
    const transaksi = await prisma.transaksi.findMany({
      select: {
        id: true,
        produkId: true,
        namaPembeli: true,
        emailPembeli: true,
        totalHarga: true,
        createdAt: true,
        produk: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ data: transaksi });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transaksi" },
      { status: 500 }
    );
  }
}

// POST create new transaksi
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { produkId, totalHarga, namaPembeli, emailPembeli } = body;

    if (!produkId || !totalHarga || !namaPembeli || !emailPembeli) {
      return NextResponse.json(
        { error: "produkId, totalHarga, namaPembeli, and emailPembeli are required" },
        { status: 400 }
      );
    }

    if (typeof totalHarga !== "number" || totalHarga < 0) {
      return NextResponse.json(
        { error: "totalHarga must be a positive number" },
        { status: 400 }
      );
    }

    if (typeof namaPembeli !== "string" || !namaPembeli.trim()) {
      return NextResponse.json(
        { error: "namaPembeli must be a valid string" },
        { status: 400 }
      );
    }

    if (typeof emailPembeli !== "string" || !emailPembeli.trim()) {
      return NextResponse.json(
        { error: "emailPembeli must be a valid string" },
        { status: 400 }
      );
    }

    // Verify produk exists
    const produk = await prisma.produk.findUnique({ where: { id: produkId } });

    if (!produk) {
      return NextResponse.json({ error: "Produk not found" }, { status: 404 });
    }

    const transaksi = await prisma.transaksi.create({
      data: {
        produkId,
        totalHarga,
        namaPembeli: namaPembeli.trim(),
        emailPembeli: emailPembeli.trim(),
      },
      include: {
        produk: true,
      },
    });

    return NextResponse.json({ data: transaksi }, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2003") {
      return NextResponse.json(
        { error: "Invalid userId or produkId" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create transaksi" },
      { status: 500 }
    );
  }
}
