import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;
        if (!name || !email || !password) {
            return new NextResponse("Missing info", { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.log(error, "Registeration error");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
