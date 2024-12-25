import { useState } from "react";
import { FileUploader } from "~/components/file-uploader";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { InfoIcon, CopyIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Route } from "./+types/home";

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (files: File[], limit: number) => {
    setIsLoading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file, file.name);
    });
    formData.append("limit", limit.toString());

    const result = await fetch(import.meta.env.VITE_API_URL + "/upload", {
      method: "POST",
      body: formData,
    });
    const response = await result.json();
    const linkId = response.id;
    navigate("/files/" + linkId);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-4">
      <div className="container mx-auto px-4 flex flex-col gap-3">
        <div className="flex flex-row mx-auto justify-center items-center space-x-3">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold text-center text-blue-800"
            viewTransition
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
            <FileUploader onUpload={handleUpload} isLoading={isLoading} />

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
