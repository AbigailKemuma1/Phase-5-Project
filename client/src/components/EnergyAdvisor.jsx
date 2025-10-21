import { useState, useRef, useEffect } from "react";

const EnergyAdvisor = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI Energy Advisor. How can I help you save energy today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Position state for dragging
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, user_id: "user123" }),
      });

      const data = await response.json();
      const aiMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = { role: "assistant", content: "Sorry, something went wrong." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div
      className="fixed z-50"
      style={{ left: position.x, top: position.y, cursor: dragging ? "grabbing" : "default" }}
    >
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg"
        >
          🤖 AI
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="w-80 bg-gray-800 rounded-xl shadow-lg flex flex-col">
          {/* Header */}
          <div
            className="bg-gray-700 rounded-t-xl px-4 py-3 flex justify-between items-center font-bold text-white cursor-grab"
            onMouseDown={handleMouseDown}
          >
            AI Energy Advisor
            <button onClick={() => setOpen(false)} className="text-white font-bold">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-96">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs break-words ${
                    msg.role === "user" ? "bg-blue-600 text-white ml-8" : "bg-gray-700 text-gray-200 mr-8"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-600">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask a question..."
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-bl-xl focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-br-xl transition-colors"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyAdvisor;
