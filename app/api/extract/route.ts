import ai from '@/lib/Google';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { extractRequestModel } from '@/zod-models/extract';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {provider, fileUrl, isLocal, fileCategory, mimeType} = extractRequestModel.parse(await req.json());

    let fileData: string;
    if (isLocal) {
      fileData = fs.readFileSync(fileUrl, { encoding: 'base64' });
    } else {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      fileData = Buffer.from(arrayBuffer).toString('base64');
    }

    if (provider === 'google') {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            inlineData: {
              mimeType: mimeType,
              data: fileData,
            },
          },
          { text: `Extract text from the following ${fileCategory}:` },
        ],
      });
      return NextResponse.json({ extractedText: response.text }, { status: 200 });
    } else if (provider === 'openai') {
      // Handle OpenAI extraction logic here
    }

    return NextResponse.json({ error: 'Unsupported provider' }, { status: 400 });
  
  } catch (error: any) {
    console.log("Error in GET /api/tmp:", error);
    return NextResponse.json({ error: error.message || 'An error occurred while processing the request.' }, { status: 500 });
  }
}
