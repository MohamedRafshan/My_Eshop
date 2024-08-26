import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI
const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Make sure this is set in your .env.local
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  tools: [{ codeExecution: {} }],
});

// Configuration for generation
const generationConfig = {
  temperature: 0.85,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export async function POST(request) {
  try {
    const { userInput } = await request.json();
    if (!userInput) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Start a chat session
    const chatSession = await model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [{ text: 'hlw\n' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Hello! 👋 How can I help you today? 😊 \n' }],
        },
        {
          role: 'user',
          parts: [{ text: 'what are the questions I can ask?' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Only agriculture-related questions.\n\n' }],
        },
        {
          role: 'user',
          parts: [{ text: 'how can you help me?' }],
        },
        {
          role: 'model',
          parts: [{ text: 'I can help you with a wide range of agriculture-related questions... 🌾' }],
        },
      ],
    });

    // Send user message and receive response
    const result = await chatSession.sendMessage(userInput);
    return new Response(
      JSON.stringify({ response: result.response.text() }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}