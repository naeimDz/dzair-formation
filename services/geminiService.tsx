import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// إعدادات شخصية "نعيم" المطور
const SYSTEM_INSTRUCTION = `
Role: You are "Naeim" (نعيم), the expert AI advisor for "Dzair Formation & Services".
Goal: Convert inquiries into registrations for heavy machinery training.

Identity & Tone:
- Tone: Professional yet warm, encouraging, "Wlid Familiya" style.
- Language: Algerian Arabic (Darja) mixed with technical French terms (e.g., "Engin", "Chantier", "Attestation").
- Format: Use bullet points and bold text for readability. Never write long blocks of text.

Knowledge Base:
- School: Dzair Formation & Services (Approved by the State / معتمدة من الدولة).
- Locations: Algeria, (وين ما تكون انت تلقانا، رانا قراب ليك).
- Methodology: 1. Advanced Simulators (Zero risk, comfortable) -> 2. Real Machine Practice.
- Machines: Excavator (Poclain), Bulldozer, Chargeur (Loaders), Forklift (Clark), Mobile Crane (Grue Mobile).
- Dossier: 2 Photos, ID Copy, Birth Certificate, Residence Certificate.
- Duration: Flexible (5-20 days).

Handling FAQ (Smart Logic):
- Price: NEVER give a flat price immediately. Ask: "واش من آلة راك حاب تتعلم عليها؟" (Which machine?). Once they answer, say prices are competitive and encourage a call/visit.
- Certification: Emphasize it opens doors for work with national and foreign companies (Sonatrach, Cosider, etc.).
- Distance: If they say they are far, mention "We have accommodation solutions" (عندنا اتفاقيات للإيواء/المرقد).

Contact:
If specific details are needed, direct to phone: 0770526454.
Keep responses short, helpful, and action-oriented.
`;

let chatSession: any = null;
const API_KEY = import.meta.env.VITE_API_KEY;
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

// Debug: Check if key is loaded at runtime
console.log("DEBUG: API_KEY loaded:", !!API_KEY, "Length:", API_KEY?.length);

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    systemInstruction: SYSTEM_INSTRUCTION,
});

const generationConfig = {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 500,
};

// دالة لإرسال الرسائل إلى تيليجرام
const sendToTelegram = async (text: string) => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
                parse_mode: 'Markdown'
            })
        });
    } catch (error) {
        console.error("Failed to log to Telegram:", error);
    }
};

export const sendMessageToGemini = async (
    history: { role: string; parts: { text: string }[] }[],
    newMessage: string
): Promise<string> => {
    // Log User Message
    sendToTelegram(`👤 **User**: ${newMessage}`);

    try {
        if (!API_KEY) {
            console.error("Gemini Error: Missing API Key");
            return "عذراً، المفتاح الخاص بالذكاء الاصطناعي مفقود (Missing API Key).";
        }

        // إعادة تهيئة الجلسة إذا لم تكن موجودة أو إذا كان التاريخ فارغاً (جلسة جديدة)
        if (!chatSession || history.length === 0) {
            chatSession = model.startChat({
                generationConfig,
                history: history.map(msg => ({
                    role: msg.role === 'user' ? 'user' : 'model', // تصحيح الأدوار لتتوافق مع Gemini
                    parts: msg.parts
                })),
            });
        }

        const result = await chatSession.sendMessage(newMessage);
        const response = await result.response;
        const responseText = response.text();

        // Log AI Response
        sendToTelegram(`🤖 **Naeim**: ${responseText}`);

        return responseText;

    } catch (error: any) {
        console.error("FULL GEMINI ERROR OBJECT:", error);

        // Log Error
        sendToTelegram(`⚠️ **Error**: ${error.message || error.toString()}`);

        chatSession = null; // إعادة تعيين الجلسة عند الخطأ

        const errorMessage = error.toString().toLowerCase();

        if (errorMessage.includes("401") || errorMessage.includes("api key")) {
            return "عذراً، هناك مشكلة في مفتاح التفعيل (Invalid API Key). يرجى التحقق من الإعدادات.";
        }

        if (errorMessage.includes("429") || errorMessage.includes("quota")) {
            return "عذراً، لقد تجاوزنا الحد المسموح به من الطلبات (Quota Exceeded). يرجى المحاولة لاحقاً.";
        }

        return "سمحلي، كاين مشكل تقني صغير. عاود سقسيني دوك نجاوبك. (Error: " + error.message + ")";
    }
};