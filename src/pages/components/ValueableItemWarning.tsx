
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface ValueableItemWarningProps {
  onClose: () => void;
}

const ValueableItemWarning = ({ onClose }: ValueableItemWarningProps) => {
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent className="text-white border-0" style={{ backgroundColor: '#2b77b6' }}>
        <AlertDialogHeader>
          <AlertDialogTitle style={{ color: '#f7f4e3' }}>Important Notice</AlertDialogTitle>
          <AlertDialogDescription className="space-y-3 text-[15px] px-2.5" style={{ color: '#f7f4e3' }}>
            <p>
              <strong>For valuable items or suspected evidence:</strong> Please contact your local police station first before posting online. This includes jewelry, electronics, wallets, ID documents, or anything that might be evidence of a crime.
            </p>
            <p>
              Only post items that are appropriate and safe to share publicly. Follow our community guidelines when posting found items.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogAction 
            onClick={onClose}
            className="text-[16px] px-10 mx-auto"
            style={{ backgroundColor: '#f7f4e3', color: '#2b77b6' }}
          >
            Got it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ValueableItemWarning;
