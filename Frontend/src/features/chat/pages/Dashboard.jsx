import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { initializeSocket } from "../service/chat.socket";
import {
  PanelLeft,
  Plus,
  Search,
  Sparkles,
  Paperclip,
  Globe,
  Mic,
  ArrowUp,
  Copy,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Compass,
  SquarePen,
  Share,
  Settings,
  X,
} from "lucide-react";

const Dashboard = () => {
  const chat = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [useSearch, setUseSearch] = useState(false);
  const [useReasoning, setUseReasoning] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    chat.initializeSocket();
  }, []);

  // Auto-resize textarea as user types
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        160
      )}px`;
    }
  };

  // Keyboard shortcut: Enter to submit, Shift+Enter for new line
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    // Send message via socket or hook
    // chat.sendMessage({ content: messageInput, useSearch, useReasoning });

    setMessageInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Scroll to bottom after message sent
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper to get initials for the user avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main className="h-[100dvh] w-full flex bg-zinc-950 text-zinc-100 font-sans antialiased overflow-hidden selection:bg-zinc-800 selection:text-white relative">
      
      {/* MOBILE BACKDROP OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* 1. SIDEBAR (Drawer on Mobile, Collapsible on Desktop) */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-40 h-full
          ${sidebarOpen ? "w-[260px] translate-x-0" : "w-0 -translate-x-full md:translate-x-0 md:w-0"}
          transition-all duration-300 ease-in-out flex flex-col
          bg-zinc-900/95 md:bg-zinc-900/60 border-r border-zinc-800/60
          backdrop-blur-xl overflow-hidden shrink-0
        `}
      >
        {/* Sidebar Header */}
        <div className="p-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <PanelLeft size={18} />
          </button>
          
          <div className="flex items-center gap-1">
            <button 
              aria-label="New Thread"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              <SquarePen size={18} />
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close mobile menu"
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* New Chat Action */}
        <div className="px-3 py-1">
          <button 
            aria-label="Create New Chat"
            className="flex items-center gap-2.5 w-full bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl p-2.5 text-sm font-medium text-zinc-200 transition-all shadow-sm"
          >
            <Plus size={16} className="text-zinc-400" />
            New Chat
          </button>
        </div>

        {/* Search threads */}
        <div className="px-3 pt-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              placeholder="Search chats..."
              aria-label="Search previous chats"
              className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            />
          </div>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <div className="text-[11px] font-medium text-zinc-500 px-2 mb-2 tracking-wider uppercase">
              Today
            </div>
            <div className="space-y-0.5">
              <button 
                aria-label="Open conversation: Dashboard Layout Refresh"
                className="flex items-center gap-2 w-full p-2 rounded-lg text-xs font-medium bg-zinc-800/50 text-zinc-200 truncate text-left"
              >
                <span className="truncate">Dashboard Layout Refresh</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-medium text-zinc-500 px-2 mb-2 tracking-wider uppercase">
              Yesterday
            </div>
            <div className="space-y-0.5">
              <button 
                aria-label="Open conversation: React State Architecture"
                className="flex items-center gap-2 w-full p-2 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 transition-colors truncate text-left"
              >
                <span className="truncate">React State Architecture</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-zinc-800/60">
          <button 
            aria-label="User settings"
            className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-zinc-800/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-xs font-semibold text-white shrink-0">
              {getUserInitials(user?.name || user?.email || "John Doe")}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-xs font-medium text-zinc-200 truncate">
                {user?.name || "John Doe"}
              </div>
              <div className="text-[10px] text-zinc-500 truncate">
                {user?.email || "Pro Plan"}
              </div>
            </div>
            <Settings size={14} className="text-zinc-400 shrink-0" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-zinc-950 relative">
        
        {/* Header Bar */}
        <header className="h-14 border-b border-zinc-800/40 px-4 flex items-center justify-between gap-4 z-10 shrink-0">
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
              >
                <PanelLeft size={18} />
              </button>
            )}

            {/* Model Selector Dropdown */}
            <button 
              aria-label="Select AI Model"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-colors text-xs font-medium text-zinc-200"
            >
              <Sparkles size={14} className="text-violet-400" />
              <span>GPT-4o</span>
              <ChevronDown size={12} className="text-zinc-500" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              aria-label="Share thread"
              className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-colors"
            >
              <Share size={16} />
            </button>
          </div>
        </header>

        {/* Scrollable Conversation Stream */}
        <div className="flex-1 overflow-y-auto px-4 py-6 min-w-0">
          <div className="max-w-4xl mx-auto space-y-9 min-w-0">
            
            {/* User Message */}
            <div className="flex justify-end min-w-0">
              <div className="max-w-[85%] break-words bg-zinc-800/80 border border-zinc-700/40 rounded-2xl px-4 py-3 text-sm text-zinc-100 shadow-sm leading-relaxed">
                I want to implement a modern, ChatGPT-style UI with floating
                controls and reasoning badges.
              </div>
            </div>

            {/* AI Message */}
            <div className="flex gap-3 md:gap-4 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-1">
                <Sparkles size={14} className="text-violet-400" />
              </div>
              
              <div className="flex-1 space-y-4 min-w-0">
                {/* Reasoning Accordion Badge */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800/80 text-[11px] text-zinc-400 font-mono">
                  <Compass size={12} className="animate-spin text-violet-400" />
                  <span>Thought for 3 seconds</span>
                </div>

                <div className="text-sm text-zinc-200 leading-relaxed space-y-3 break-words">
                  <p>
                    Here is an updated design architecture featuring modern UI
                    patterns:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                    <li>Floating composer pill with contextual tools</li>
                    <li>
                      Glassmorphic sidebar with instant collapsible drawer
                    </li>
                    <li>Inline AI response tools (Copy, Retry, Feedback)</li>
                  </ul>
                </div>

                {/* Response Tools */}
                <div className="flex items-center gap-1 pt-1 text-zinc-500">
                  <button 
                    aria-label="Copy response"
                    className="p-1.5 hover:text-zinc-300 hover:bg-zinc-900 rounded-md transition-colors"
                  >
                    <Copy size={14} />
                  </button>
                  <button 
                    aria-label="Regenerate response"
                    className="p-1.5 hover:text-zinc-300 hover:bg-zinc-900 rounded-md transition-colors"
                  >
                    <RotateCw size={14} />
                  </button>
                  <button 
                    aria-label="Good response"
                    className="p-1.5 hover:text-zinc-300 hover:bg-zinc-900 rounded-md transition-colors"
                  >
                    <ThumbsUp size={14} />
                  </button>
                  <button 
                    aria-label="Bad response"
                    className="p-1.5 hover:text-zinc-300 hover:bg-zinc-900 rounded-md transition-colors"
                  >
                    <ThumbsDown size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Scroll Anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 3. FLOATING COMPOSER INPUT */}
        <div className="p-3 md:p-4 w-full max-w-2xl mx-auto shrink-0">
          <div className="relative bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-2xl p-2.5 md:p-3 backdrop-blur-md focus-within:border-zinc-700 transition-all">
            
            {/* Auto-Expanding Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={messageInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              aria-label="Message prompt input"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 resize-none focus:outline-none px-1 max-h-40 overflow-y-auto leading-relaxed"
            />

            {/* Composer Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50 mt-1">
              
              {/* Feature Pills */}
              <div className="flex items-center gap-1 md:gap-1.5">
                <button 
                  aria-label="Attach file"
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <Paperclip size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setUseSearch(!useSearch)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors border ${
                    useSearch
                      ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                      : "border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  <Globe size={13} />
                  <span>Search</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUseReasoning(!useReasoning)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors border ${
                    useReasoning
                      ? "bg-violet-500/10 border-violet-500/30 text-violet-400"
                      : "border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  <Sparkles size={13} />
                  <span>Reason</span>
                </button>
              </div>

              {/* Input Submit Action */}
              <div className="flex items-center gap-1.5">
                <button 
                  aria-label="Voice input"
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <Mic size={16} />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  aria-label="Send message"
                  className="p-2 bg-zinc-100 text-zinc-950 hover:bg-white disabled:opacity-30 disabled:hover:bg-zinc-100 rounded-xl transition-colors shadow-sm"
                >
                  <ArrowUp size={16} strokeWidth={2.5} />
                </button>
              </div>

            </div>
          </div>

          <div className="text-center text-[11px] text-zinc-600 mt-2">
            GPT-4o can make mistakes. Verify important details.
          </div>
        </div>

      </div>
    </main>
  );
};

export default Dashboard;