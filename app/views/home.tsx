"use client";

import { useState } from "react";
import { FileUploader } from "~/components/file-uploader";
import { FileList } from "~/components/file-list";
import { QRCode } from "~/components/qr-code";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { InfoIcon, CopyIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; downloads: number; limit: number }[]
  >([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (files: File[], limit: number) => {
    setIsLoading(true);
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newFiles = files.map((file) => ({
      name: file.name,
      downloads: 0,
      limit,
    }));
    setUploadedFiles(newFiles);
    setShowResults(true);
    setIsLoading(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-4">
      <div className="container mx-auto px-4 flex flex-col gap-3">
        <div className="flex flex-row mx-auto justify-center items-center space-x-3">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold text-center text-blue-800"
          >
            ChillFile
          </Link>
          <img src="/192.png" alt="ChillFile Logo" width={50} height={50} />
        </div>
        <p className="text-center text-blue-700 text-lg sm:text-xl">
          Share files at the speed of thought.
        </p>
        <Card className="max-w-2xl mx-auto mt-4 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 text-lg sm:text-xl">
              Share Your Files
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showResults ? (
              <FileUploader onUpload={handleUpload} isLoading={isLoading} />
            ) : (
              <div className="space-y-4">
                <QRCode />
                <FileList files={uploadedFiles} />
              </div>
            )}
            <Button
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <CopyIcon className="h-5 w-5" />
              <span>Share This Web</span>
            </Button>
            <Alert className="bg-blue-50 border-blue-200 py-3">
              <InfoIcon className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-700 text-sm sm:text-base">
                Files are automatically deleted after 24 hours for your privacy.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
