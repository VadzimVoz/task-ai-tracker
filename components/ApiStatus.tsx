'use client';

import { useState, useEffect } from 'react';

export default function ApiStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch('/api/tasks', {
          method: 'HEAD',
          cache: 'no-store'
        });
        setStatus(response.ok ? 'online' : 'offline');
      } catch {
        setStatus('offline');
      }
    };

    checkApi();
    const interval = setInterval(checkApi, 30000); // Проверка каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`api-status ${status}`}>
      API статус: {status === 'online' ? '✅ Онлайн' : status === 'offline' ? '❌ Офлайн' : '⏳ Проверка...'}
    </div>
  );
}