import { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const useChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'model',
            text: 'مرحباً بك! أنا "نعيم"، المستشار التدريبي. هل لديك استفسار حول التسجيل، الأسعار، أو ملف (Dossier) الالتحاق؟',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: new Date()
        };

        // Optimistic update
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Prepare history for the service (excluding the new message as it's passed separately)
            // Note: The service now handles session history internally, but we pass the context for the first init if needed
            // or we could just pass the full history if we were stateless.
            // Given the refactor, we just need to pass the history structure expected by the service.
            // Filter out the initial welcome message (or any leading model messages)
            // The API requires the first message to be from the 'user'
            const history = messages
                .filter((_, index) => index > 0 || messages[0].role === 'user')
                .map(m => ({
                    role: m.role,
                    parts: [{ text: m.text }]
                }));

            const responseText = await sendMessageToGemini(history, userMsg.text);

            const modelMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, modelMsg]);
        } catch (error) {
            console.error("Chat Error:", error);
            // Optionally add an error message to the chat
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isOpen,
        toggleChat,
        messages,
        input,
        setInput,
        isLoading,
        sendMessage,
        messagesEndRef,
        setIsOpen
    };
};
