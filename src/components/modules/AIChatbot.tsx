import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, PhoneCall, AlertTriangle, Loader2 } from 'lucide-react';
import { Language, ChatMessage } from '../../types';
import { translations } from '../../data/translations';

interface AIChatbotProps {
  language: Language;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ language }) => {
  const t = translations[language];
  const isHindi = language === 'hi';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: isHindi
        ? 'नमस्ते! मैं केयरसेतु 24x7 एआई स्वास्थ्य सहायक हूं। आप मुझसे प्राथमिक उपचार, सरकारी योजनाओं, जन औषधि दवाओं या किसी भी बीमारी के लक्षण पूछ सकते हैं। आप हिंदी या अंग्रेजी में लिख सकते हैं।'
        : 'Hello! I am your 24x7 CareSetu AI Health Assistant. Ask me about first-aid, generic medicines, government schemes, or health guidance in English or Hindi.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = isHindi ? [
    'सांप काटने पर प्राथमिक उपचार',
    'जन औषधि दवाएं कहां मिलेंगी?',
    'आयुष्मान कार्ड कैसे बनवाएं?',
    'बच्चे को बुखार आने पर क्या करें?'
  ] : [
    'Snake bite first aid steps',
    'How to save money with Jan Aushadhi generic medicines?',
    'Ayushman Bharat scheme eligibility & documents',
    'Infant fever first care guidelines'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language: language
        })
      });

      const data = await response.json();

      const aiReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || (isHindi ? 'क्षमा करें, उत्तर प्राप्त करने में समस्या हुई। कृपया पुनः प्रयास करें।' : 'Sorry, could not generate reply. Please try again.'),
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiReply]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: isHindi ? 'नेटवर्क समस्या या सर्वर त्रुटि। इमरजेंसी में 108 पर कॉल करें।' : 'Network error. Call 108 in emergencies.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 pb-12 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-[#028090] text-white rounded-2xl p-5 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-[#02C39A] text-[#0B3B3C] flex items-center justify-center font-bold shadow-xs shrink-0">
            <Bot className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">
              {t.modChatbotTitle}
            </h2>
            <p className="text-xs text-indigo-100 font-medium">
              {t.modChatbotDesc}
            </p>
          </div>
        </div>

        <a
          href="tel:108"
          className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shrink-0 shadow-xs flex items-center gap-1.5"
        >
          <PhoneCall className="h-3.5 w-3.5" />
          <span>108 SOS</span>
        </a>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-indigo-100 shadow-md overflow-hidden flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
              >
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-xs ${
                  isAI ? 'bg-[#028090] text-white' : 'bg-indigo-600 text-white'
                }`}>
                  {isAI ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm font-medium leading-relaxed shadow-2xs ${
                  isAI
                    ? 'bg-white text-slate-900 border border-slate-200/80 rounded-tl-xs'
                    : 'bg-[#028090] text-white rounded-tr-xs'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 p-2">
              <Loader2 className="h-4 w-4 animate-spin text-[#028090]" />
              <span>{isHindi ? 'केयरसेतु एआई उत्तर तैयार कर रहा है...' : 'CareSetu AI thinking...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <Sparkles className="h-4 w-4 text-[#02C39A] shrink-0 ml-1" />
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-900 px-3 py-1.5 rounded-full whitespace-nowrap font-semibold border border-indigo-200 shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isHindi ? 'स्वास्थ्य प्रश्न या लक्षण पूछें...' : 'Ask health query in English or Hindi...'}
              className="flex-1 bg-slate-50 text-xs sm:text-sm font-medium p-3 rounded-xl border border-slate-300 focus:outline-hidden text-slate-900"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-[#028090] hover:bg-[#00A896] text-white font-extrabold text-xs sm:text-sm disabled:opacity-50 transition-all shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <span>{isHindi ? 'भेजें' : 'Send'}</span>
              <Send className="h-4 w-4 text-[#02C39A]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
