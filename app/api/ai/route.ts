import { executor } from "./executor";
import { NextResponse } from "next/server";
import { aiProvider } from "./aiProvider";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { message } = await request.json();
        console.log(message);
        if (!message) {
            return NextResponse.json({ error: "Missing message" }, { status: 400 });
        }

        const action = await aiProvider(message, "gemini");
        await executor(session.user.id, action);

        return NextResponse.json({
            success: true,
            action
        })
    } catch (error) {
        console.error("Error in AI route:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}