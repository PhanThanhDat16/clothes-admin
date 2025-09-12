const MainMessage = () => {
  return (
    <>
      <main className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center px-8 py-5 border-b bg-white/80 backdrop-blur-md">
          <img
            src="https://images.unsplash.com/photo-1754377479970-bc010d2732ed?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-12 h-12 rounded-full object-cover border mr-4"
          />
          <div>
            <div className="font-semibold text-lg text-gray-800">Ngo Thanh Tien</div>
            {/* <div className="flex items-center gap-2 text-xs text-gray-400">
              <span
                className={`w-2 h-2 rounded-full inline-block ${
                  selectedUser?.online ? 'bg-emerald-400' : 'bg-gray-300'
                }`}
              ></span>
              {selectedUser?.online ? 'Online' : 'Offline'}
            </div> */}
          </div>
        </div>
        {/* Messages */}
        {/* <div className="flex-1 overflow-y-auto px-8 py-6 bg-gradient-to-br from-white via-emerald-50 to-indigo-50">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400">
              No messages yet. Start the conversation!
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex mb-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[60%] px-5 py-3 rounded-2xl shadow-sm text-base break-words
                  ${
                    msg.sender === 'me'
                      ? 'bg-emerald-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 border rounded-bl-md'
                  }
                `}
              >
                <div>{msg.content}</div>
                <div className="text-[11px] text-gray-300 text-right mt-1">{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div> */}
        +{/* Input */}
        {/* <form onSubmit={handleSend} className="flex items-center px-8 py-5 border-t bg-white/90 backdrop-blur-md gap-3">
          <input
            type="text"
            className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 text-base"
            placeholder={`Message ${selectedUser?.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full transition flex items-center gap-2 shadow"
          >
            <i className="bx bx-send text-xl"></i>
          </button>
        </form> */}
      </main>
    </>
  )
}

export default MainMessage
