import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/card";

export default function WhatsAppWebhookSaaS() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "https://try-whatsapp.onrender.com/events"
    );

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setLogs((prev) => [`📥 From ${data.from}: ${data.msgBody}`, ...prev]);
    };

    eventSource.onerror = (e) => {
      console.error("EventSource error:", e);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          📲 WhatsApp Webhook Panel
        </h1>

        <Card className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="font-medium mb-3 text-lg">📜 Live Logs</h2>
            <div className="bg-neutral-700 p-3 rounded-lg max-h-[28rem] overflow-y-auto text-sm space-y-1">
              {logs.length === 0 ? (
                <div className="text-neutral-400 text-center">
                  No messages yet
                </div>
              ) : (
                logs.map((log, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-800 p-2 rounded hover:bg-neutral-700 transition-colors"
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
