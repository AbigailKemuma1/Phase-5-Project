import React, { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    // Static replies for demonstration (10 cases)
    let reply = '';
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('hello')) {
      reply = 'Hello! How can I help you save energy today?';
    } else if (lowerInput.includes('tips')) {
      reply = 'Here are some energy saving tips: turn off lights when not in use, unplug devices, and use energy-efficient appliances.';
    } else if (lowerInput.includes('bye')) {
      reply = 'Goodbye! Remember to save energy.';
    } else if (lowerInput.includes('appliance')) {
      reply = 'Energy-efficient appliances can help reduce your electricity bill.';
    } else if (lowerInput.includes('solar')) {
      reply = 'Solar panels are a great way to generate clean energy and save money.';
    } else if (lowerInput.includes('cost')) {
      reply = 'Reducing energy usage can lower your monthly costs.';
    } else if (lowerInput.includes('light')) {
      reply = 'LED lights use less energy and last longer than traditional bulbs.';
    } else if (lowerInput.includes('weather')) {
      reply = 'Weatherproofing your home can help save energy during extreme temperatures.';
    } else if (lowerInput.includes('insulation')) {
      reply = 'Proper insulation keeps your home comfortable and reduces energy waste.';
    } else if (lowerInput.includes('thank')) {
      reply = 'You’re welcome! Let me know if you have more questions.';
    } else {
      reply = 'This is a static test reply. Your chatbot UI is working!';
    }
    setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      {/* Bot Icon Button */}
      <button
        className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full shadow-lg p-3 flex items-center justify-center hover:scale-105 transition-transform"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Energy Chatbot"
      >
        <SparklesIcon className="h-8 w-8 text-white" />
      </button>
      {/* Chat Window */}
      {open && (
        <div className="mt-2 w-80 bg-white border border-emerald-200 rounded-xl shadow-xl overflow-hidden animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500">
            <SparklesIcon className="h-6 w-6 text-white" />
            <span className="font-bold text-white text-lg">AI Energy Advisor</span>
          </div>
          <div className="px-4 py-2 h-64 overflow-y-auto flex flex-col gap-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className={`px-3 py-2 rounded-2xl text-sm max-w-[70%] ${msg.sender === 'user' ? 'bg-emerald-100 text-gray-900' : 'bg-white border border-emerald-200 text-emerald-700'}`}>{msg.text}</span>
              </div>
            ))}
            {loading && <div className="text-center text-gray-400">Thinking...</div>}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 px-4 py-3 bg-white border-t border-emerald-100">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about saving energy..."
              className="flex-1 px-3 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold shadow hover:scale-105 transition-transform"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
