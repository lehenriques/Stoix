import { useEffect } from 'react';
import { Alert } from '@/components/ui/alert';
import { Icon } from '@/components/icon';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variants = {
    success: 'default',
    error: 'destructive',
    info: 'default',
  } as const;

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  } as const;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
      <Alert variant={variants[type]} className="min-w-[300px] shadow-lg">
        <div className="flex items-center gap-2">
          <Icon iconNode={icons[type]} className="h-4 w-4" />
          <p className="text-sm font-medium">{message}</p>
          <button
            onClick={onClose}
            className="ml-auto rounded-full p-1 hover:bg-background/20"
          >
            <Icon iconNode={X} className="h-4 w-4" />
          </button>
        </div>
      </Alert>
    </div>
  );
}
