import React, { useState, useRef, useEffect } from 'react';

const EnergyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your Energy Advisor. Ask me about energy saving tips, appliance efficiency, or sustainability practices!'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  const quickResponses = {
    // Greetings
    "hi": "👋 Hello! I'm here to help you save energy and reduce costs. Ask me about energy-efficient appliances, tips to lower your bill, or sustainable practices!",
    "hello": "👋 Hello! I'm here to help you save energy and reduce costs. Ask me about energy-efficient appliances, tips to lower your bill, or sustainable practices!",
    "hey": "👋 Hey there! Ready to save some energy? I can help with efficiency tips, appliance advice, and cost-saving strategies!",
    "help": "🆘 I can help you with: energy saving tips, appliance efficiency, reducing electricity bills, heating/cooling advice, and sustainable practices. What interests you?",
    
    // Energy bill questions
    "how can i reduce my electricity bill": "💡 Switch to LED bulbs, unplug devices when not in use, and use appliances during off-peak hours. Set your thermostat 2-3°F lower in winter.",
    "reduce electricity bill": "💡 Switch to LED bulbs, unplug devices when not in use, and use appliances during off-peak hours. Set your thermostat 2-3°F lower in winter.",
    "lower energy costs": "💡 Switch to LED bulbs, unplug devices when not in use, and use appliances during off-peak hours. Set your thermostat 2-3°F lower in winter.",
    
    // Appliance questions
    "what appliances use the most energy": "🔌 Heating/cooling systems (40-50%), water heaters (18%), washers/dryers (13%), and refrigerators (8%) are your biggest energy consumers.",
    "energy consuming appliances": "🔌 Heating/cooling systems (40-50%), water heaters (18%), washers/dryers (13%), and refrigerators (8%) are your biggest energy consumers.",
    
    // Heating questions
    "tips for energy-efficient heating": "🏠 Use a programmable thermostat, seal air leaks, clean filters monthly, and layer clothing before turning up heat. Zone heating saves 10-40%.",
    "efficient heating": "🏠 Use a programmable thermostat, seal air leaks, clean filters monthly, and layer clothing before turning up heat. Zone heating saves 10-40%.",
    
    // Timing questions
    "best time to use appliances": "⏰ Use major appliances during off-peak hours (typically 10 PM - 6 AM) when electricity rates are lower. Avoid peak hours 4-9 PM.",
    "when to use appliances": "⏰ Use major appliances during off-peak hours (typically 10 PM - 6 AM) when electricity rates are lower. Avoid peak hours 4-9 PM.",
    
    // General tips
    "energy saving tips": "💡 LED bulbs, programmable thermostat, unplug unused devices, air seal your home, and use appliances during off-peak hours for maximum savings!",
    "save energy": "💡 LED bulbs, programmable thermostat, unplug unused devices, air seal your home, and use appliances during off-peak hours for maximum savings!"
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    // Check for quick response first (with fuzzy matching)
    const userMessageLower = userMessage.toLowerCase();
    let quickResponse = quickResponses[userMessageLower];
    
    // If no exact match, try partial matching
    if (!quickResponse) {
      for (const [key, value] of Object.entries(quickResponses)) {
        if (userMessageLower.includes(key.split(' ')[0]) && userMessageLower.includes(key.split(' ')[key.split(' ').length - 1])) {
          quickResponse = value;
          break;
        }
      }
    }
    
    if (quickResponse) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: quickResponse 
      }]);
      setIsLoading(false);
      return;
    }

    // Create timeout promise
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 10000) // 10 second timeout
    );

    try {
      // Shorter, more direct prompt for faster processing
      const energyPrompt = `Energy tip for: ${userMessage}. Give 1-2 sentence practical advice.`;

      const fetchPromise = fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.2:1b', // Using smaller 1B model for speed
          prompt: energyPrompt,
          stream: false,
          options: {
            temperature: 0.3,
            top_p: 0.9,
            num_predict: 50 // Limit response length for speed
          }
        })
      });

      const response = await Promise.race([fetchPromise, timeout]);

      if (!response.ok) {
        throw new Error('Failed to get response from Ollama');
      }

      const data = await response.json();
      
      // Add assistant response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || 'Sorry, I couldn\'t process your request right now.' 
      }]);

    } catch (error) {
      console.error('Chatbot error:', error);
      let errorMessage = 'Sorry, I\'m having trouble right now. ';
      
      if (error.message === 'Request timeout') {
        errorMessage += 'The AI is taking too long to respond. Try a simpler question.';
      } else {
        errorMessage += 'Make sure Ollama is running and try again.';
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "How can I reduce my electricity bill?",
    "What appliances use the most energy?",
    "Tips for energy-efficient heating?",
    "Best time to use appliances?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
        >
          <span className="text-xl">💬</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-gray-800 border border-gray-600 rounded-lg shadow-xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">⚡</span>
              <h3 className="font-semibold">Energy Advisor</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 text-xl"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-sm'
                      : 'bg-gray-700 text-gray-100 rounded-bl-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 p-3 rounded-lg rounded-bl-sm text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs text-gray-400">AI thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
              <div className="space-y-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(question);
                    }}
                    className="block w-full text-left text-xs text-emerald-400 hover:text-emerald-300 truncate"
                  >
                    • {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-600">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about energy saving..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnergyChatbot;