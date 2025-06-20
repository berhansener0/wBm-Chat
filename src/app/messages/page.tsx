"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  role: string;
};

type Message = {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
};

export default function MessagesPage() {
  const currentUserId = 1;

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();

      const filtered = data.filter((user: User) => user.id !== currentUserId);
      setUsers(filtered);
    }
    fetchUsers();
  }, []);

  async function logout() {
    await fetch('/api/logout', {
      method: 'POST',
    });
    window.location.href = '/login';  // çıkış sonrası login sayfasına yönlendir
  }

  useEffect(() => {
    if (!selectedUser) return;

    async function fetchMessages() {
      const res = await fetch("/api/messages/get", {
        method: "POST",
        body: JSON.stringify({
          user1Id: currentUserId,
          user2Id: selectedUser!.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setMessages(data.messages);
    }
    fetchMessages();
  }, [selectedUser]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || input.trim() === "") return;

    const res = await fetch("/api/messages/send", {
      method: "POST",
      body: JSON.stringify({
        senderId: currentUserId,
        receiverId: selectedUser.id,
        content: input,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setMessages((prev) => [...prev, data.data]);
    setInput("");
  };

  const selectedEmail = selectedUser?.email;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Kullanıcı listesi */}
      <aside className="w-64 bg-white border-r shadow-sm p-4">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Kullanıcılar</h2>
        <ul className="space-y-2">
          {users.length === 0 && (
            <li className="text-gray-400 text-center">Kullanıcı bulunamadı</li>
          )}
          {users.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => setSelectedUser(user)}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedUser?.id === user.id
                    ? "bg-blue-100 text-blue-800 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {user.email}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mesajlaşma alanı */}
      <div className="flex flex-col flex-1">
        {/* Başlık */}
        <header className="p-6 bg-white shadow-md text-center border-b flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600 tracking-wide">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
                wBm-Chatleş
              </span>
            </h1>

            {selectedEmail ? (
              <p className="mt-2 text-sm text-gray-500">
                Sohbet ediyorsun: <strong>{selectedEmail}</strong>
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-400">Lütfen bir kullanıcı seçin</p>
            )}
          </div>

          {/* Çıkış Yap Butonu */}
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Çıkış Yap
          </button>
        </header>

        {/* Mesajlar */}
        <main className="flex-1 p-6 overflow-y-auto">
          {!selectedUser ? (
            <p className="text-gray-400 text-center mt-10">
              Bir kullanıcı seçerek sohbet başlatın.
            </p>
          ) : messages.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">Henüz mesaj yok.</p>
          ) : (
            <div className="max-w-2xl mx-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl shadow max-w-md ${
                    msg.senderId === currentUserId
                      ? "bg-blue-100 text-right ml-auto"
                      : "bg-white text-left mr-auto"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Mesaj yazma alanı */}
        {selectedUser && (
          <footer className="bg-white shadow-inner p-4 border-t">
            <form
              onSubmit={sendMessage}
              className="max-w-2xl mx-auto flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mesaj yaz..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Gönder
              </button>
            </form>
          </footer>
        )}
      </div>
    </div>
  );
}
