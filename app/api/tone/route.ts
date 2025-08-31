import { NextRequest, NextResponse } from "next/server";
import {cache} from '@/lib/cache';
import { z} from 'zod'; 
import { generatePrompt } from "@/lib/prompts";




const requestSchema = z.object({
    text: z.string().min(1).max(10000),
    formality: z.enum(['formal','neutral','casual']),
    verbosity : z.enum(['concise','neutral','elaborate'])
});

export async function POST(request: NextRequest) {
    try{
        const body = await request.json();
        const {text, formality ,verbosity} = requestSchema.parse(body);

        // check cache first
        const cachedResult = cache.get(text,formality,verbosity);
        if(cachedResult){
            return NextResponse.json({
                rewrittenText : cachedResult,
                cached : true
            });
        }

        // check for api key
        const apiKey = process.env.MISTRAL_API_KEY;
        if(!apiKey){
            return NextResponse.json(
                {error:'Mistral Api key not configured '},
                {status: 500}
            );
        }

        // generate prompt
        const prompt = generatePrompt(text,formality,verbosity);

        // call mistral api
        const response  = await fetch('https://api.mistral.ai/v1/chat/completions',{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${apiKey}`,
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                model:'mistral-small-latest',
                messages:[
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature:0.7,
                max_tokens:2000
            }),
        });

        if(!response.ok){
            const errorData = await response.text();
            console.error('mistral api error',errorData);
            return NextResponse.json(
                {error: 'Failed to process text with AI'},
                {status:response.status}
            );
        }

        const data = await response.json();
        const rewrittenText = data.choices?.[0]?.message?.content?.trim();

        if(!rewrittenText){
            return NextResponse.json(
                {error:'No rewritten text received from ai'},
                {status: 500}
            );
        }

        // cache teh result
        cache.set(text,formality,verbosity,rewrittenText);

        return NextResponse.json(
            {
                rewrittenText,
                cached:false
            }
        );

    }catch(e){
        console.error('api route error',e);

        if(e instanceof z.ZodError){
            return NextResponse.json(
                {error:'Invalid request data ',details:e.issues},
                {status:400}
            );
        }

        return NextResponse.json(
            {error:'Internal server error'},
            {status:500}
        )
    }
}