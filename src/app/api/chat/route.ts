import { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        const options = {
            method: "POST",
            // change the below url to your project route on Eden AI
            url: "https://api.edenai.run/v2/aiproducts/askyoda/v2/d5a19a40-fd45-42aa-be9e-587e84eb63ce/ask_llm",
            headers: {
                authorization: `Bearer ${process.env.EDENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            data: {
                query,
                llm_provider: "openai",
                llm_model: "gpt-4",
                k: 5,
                filter_documents: { metadata1: "value1" },
                max_tokens: 100,
                temperature: 0,
            },
        };

        const response = await axios.request(options);

        return new Response(JSON.stringify(response.data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Eden AI API error:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error", details: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
