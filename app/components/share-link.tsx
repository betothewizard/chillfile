import { CopyIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export function ShareLink() {
  const [buttonText, setButtonText] = useState("Copy Link");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setButtonText("Link copied!");
      setTimeout(() => setButtonText("Copy Link"), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="p-2 bg-white rounded-lg shadow-md">
        <QRCodeSVG value={window.location.href} />
      </div>
      <Button
        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm w-36"
        onClick={handleCopyLink}
      >
        <CopyIcon className="w-5 h-5" />
        <span>{buttonText}</span>
      </Button>
    </div>
  );
}
