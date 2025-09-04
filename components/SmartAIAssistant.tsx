// components/SmartAIAssistant.tsx
'use client';

import { useState, useEffect } from 'react';
import { PseudoAIService } from '../lib/pseudoAI';
import { useTaskStore } from '../store/taskStore';
import '../styles/layout.css';
import '../styles/typography.css';


export default function SmartAIAssistant() {
  const [suggestions, setSuggestions] = useState<{ text: string; confidence: number; context: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const { tasks, addTask } = useTaskStore();

  const existingTasksText = tasks.map(t => t.text);

  const generateSuggestions = async () => {
    setIsLoading(true);
    setAiThinking(true);
    
    try {
      const newSuggestions = await PseudoAIService.generateSmartSuggestions(
        existingTasksText,
        undefined,
        4
      );
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAiThinking(false), 500);
    }
  };

  const addSuggestion = (text: string, type: 'today' | 'reminder' = 'today') => {
    addTask({
      text,
      type,
      completed: false,
      dueDate: type === 'reminder' ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : null
    });
    
    // Удаляем использованное предложение
    setSuggestions(prev => prev.filter(s => s.text !== text));
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: '24px',
      color: 'white',
      margin: '24px 0',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px',
          fontSize: '20px'
        }}>
          {aiThinking ? '🤔' : '🤖'}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Умный AI-Помощник</h3>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '14px' }}>
            {aiThinking ? 'Анализирую ваши задачи...' : 'Готов предложить идеи!'}
          </p>
        </div>
      </div>

      <button
        onClick={generateSuggestions}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '12px',
          background: isLoading ? '#ccc' : 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '16px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s'
        }}
      >
        {isLoading ? '🧠 Генерирую умные предложения...' : '✨ Получить AI-предложения'}
      </button>

      {suggestions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Рекомендации:</h4>
          <div style={{ display: 'grid', gap: '8px' }}>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '12px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div>
                  <div style={{ fontSize: '14px' }}>{suggestion.text}</div>
                  <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                    Уверенность: {Math.round(suggestion.confidence * 100)}% • 
                    Контекст: {suggestion.context}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => addSuggestion(suggestion.text, 'today')}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ✅ Задача
                  </button>
                  <button
                    onClick={() => addSuggestion(suggestion.text, 'reminder')}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ⏰ Напоминание
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && suggestions.length === 0 && !aiThinking && (
        <div style={{ 
          marginTop: '16px', 
          padding: '16px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          Нажмите кнопку выше для генерации умных предложений на основе:
          <br />
          <span style={{ opacity: 0.8 }}>• Времени суток • Ваших текущих задач • Контекста</span>
        </div>
      )}
    </div>
  );
}