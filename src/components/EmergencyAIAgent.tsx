import React, { useState, useEffect } from 'react';
import { AlertCircle, Send, Loader, X } from 'lucide-react';
import { AppointmentScheduler } from './scheduling/AppointmentScheduler';
import { supabase } from '../lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface EmergencyAIAgentProps {
  onClose: () => void;
}

export const EmergencyAIAgent = ({ onClose }: EmergencyAIAgentProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm here to help with your pest emergency. Could you please describe the situation you're experiencing?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };
    checkAuth();
  }, []);

  // Disable body scroll when chat is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleScheduleAppointment = async (date: string, time: string) => {
    try {
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I've scheduled your emergency inspection for ${formattedDate} at ${time}. A confirmation email will be sent shortly. Our technician will arrive prepared to handle your pest situation. Would you like any immediate safety instructions while you wait?`
      }]);
      
      // Log this interaction in audit logs if user is authenticated
      if (isAuthenticated) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('audit_logs').insert({
            user_id: user.id,
            action: 'emergency_appointment_scheduled',
            details: { date, time }
          });
        }
      }
      
      setShowScheduler(false);
    } catch (error) {
      console.error('Error handling appointment:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, there was an error scheduling your appointment. Please try again or call our emergency number at (302) 561-5654."
      }]);
      setShowScheduler(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Simulate AI response - Replace with actual AI integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiResponse = await getAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);

      // Show scheduler if user wants to check available slots
      if (userMessage.toLowerCase().includes('appointment') || 
          userMessage.toLowerCase().includes('schedule') ||
          userMessage === '1') {
        setShowScheduler(true);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request. Please call our emergency number at (302) 561-5654 for immediate assistance."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('emergency') || lowercaseMessage.includes('urgent')) {
      return "I understand this is an emergency situation. To help you better, could you tell me:\n1. What type of pest are you seeing?\n2. Where in your property are they located?\n3. Are you or anyone else in immediate danger?";
    }
    
    if (lowercaseMessage.includes('rat') || lowercaseMessage.includes('mouse') || lowercaseMessage.includes('rodent')) {
      return "Rodent infestations require immediate attention. To ensure your safety:\n1. Stay away from the affected area\n2. Don't touch any droppings\n3. Seal food in containers\n\nWould you like me to check our next available appointment slot for you? We prioritize rodent cases and will get a technician to you as soon as possible.";
    }
    
    if (lowercaseMessage.includes('bed bug') || lowercaseMessage.includes('bedbug')) {
      return "Bed bug situations can be very distressing. To help immediately:\n1. Don't move any furniture or belongings\n2. Bag any affected bedding\n3. Would you like me to check our next available appointment with our bed bug specialist?";
    }

    if (lowercaseMessage === '1' || lowercaseMessage.includes('appointment') || lowercaseMessage.includes('schedule')) {
      return "I'll help you schedule an emergency inspection right away. Please select your preferred date and time from the available slots below.";
    }

    return "Thank you for providing that information. Based on what you've described, this situation requires professional attention. Would you like me to:\n1. Check the next available appointment slot?\n2. Provide immediate safety instructions?\n3. Connect you with our on-call technician?";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Chat Window */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-primary-500 text-white rounded-t-xl flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <h3 className="font-semibold">Emergency Pest Control Assistant</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-black/10 rounded-lg"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {showScheduler ? (
            <AppointmentScheduler
              onSchedule={handleScheduleAppointment}
              onBack={() => setShowScheduler(false)}
            />
          ) : (
            <>
              {/* Messages */}
              <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-xl ${
                        message.role === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                      <Loader className="w-5 h-5 animate-spin text-primary-500" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your emergency..."
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};