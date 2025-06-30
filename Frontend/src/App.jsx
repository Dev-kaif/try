import { useState, useEffect } from 'react';

export default function WhatsAppWebhookTester() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('https://try-whatsapp.onrender.com/events');

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setLogs(prev => [`📥 Incoming message from ${data.from}: ${data.msgBody}`, ...prev]);
    };

    eventSource.onerror = (e) => {
      console.error('EventSource error:', e);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Logs (Live Incoming & Test):</h2>
        <ul className="bg-gray-100 p-2 rounded max-h-64 overflow-y-auto text-sm">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
