import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InactivityPromptProps {
    onContinue: () => void;
    onStop: () => void;
}

const InactivityPrompt: React.FC<InactivityPromptProps> = ({ onContinue, onStop }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-800 transform animate-in zoom-in-95 duration-300">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle size={32} />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">Still Listening?</h2>
                    <p className="text-stone-600 dark:text-stone-400 mb-8">
                        The website has been inactive for some time. Would you like to continue listening to the kirtans?
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <button
                            onClick={onContinue}
                            className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-900/20"
                        >
                            Yes, Continue
                        </button>
                        <button
                            onClick={onStop}
                            className="flex-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold py-4 px-6 rounded-2xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-all active:scale-[0.98]"
                        >
                            No, Pause
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InactivityPrompt;
