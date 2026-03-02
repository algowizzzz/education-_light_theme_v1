import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: 'default' | 'destructive';
}

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  variant = 'default',
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-surface-card border-border-default">
        <DialogHeader>
          <DialogTitle className="text-xl text-text-heading">{title}</DialogTitle>
          <DialogDescription className="text-text-label text-base pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border-default text-text-heading hover:bg-surface-page"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={
              variant === 'destructive'
                ? 'bg-brand-dark hover:bg-brand text-white'
                : 'bg-brand hover:bg-brand-dark text-white'
            }
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
