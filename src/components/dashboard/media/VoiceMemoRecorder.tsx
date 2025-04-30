import React from 'react';
import { Mic, Square, Play } from 'lucide-react';

export const VoiceMemoRecorder = () => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [duration, setDuration] = React.useState(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    let interval: number;
    if (isRecording) {
      interval = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Voice Memo</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isRecording ? 'bg-red-100 dark:bg-red-900/30' : 'bg-mint-100 dark:bg-mint-900/30'
            }`}>
              <Mic className={`w-8 h-8 ${
                isRecording ? 'text-red-500' : 'text-mint-500'
              }`} />
            </div>
            {isRecording && (
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            )}
          </div>

          <div className="text-2xl font-semibold text-dark-900 dark:text-white">
            {formatTime(duration)}
          </div>

          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-mint-500 hover:bg-mint-600 text-white'
            }`}
          >
            {isRecording ? (
              <>
                <Square className="w-4 h-4" />
                <span>Stop Recording</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Recording</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};