"use client";

import { useState } from "react";
import { FileUploader } from "~/components/file-uploader";
import { FileList } from "~/components/file-list";
import { QRCode } from "~/components/qr-code";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { InfoIcon } from "lucide-react";

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
          ChillFile
        </h1>
        <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 text-xl">
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
            <Alert className="bg-blue-50 border-blue-200 py-3">
              <InfoIcon className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-700 text-base">
                Files are automatically deleted after 24 hours for your privacy.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        <footer className="mt-4 text-center text-sm text-blue-600">
          © {new Date().getFullYear()} ChillFile. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
