import { Route } from "./+types/files";
import { FileList, FileType } from "~/components/file-list";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Link } from "react-router";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { InfoIcon, ArrowLeft } from "lucide-react";
import { ShareLink } from "~/components/share-link";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(import.meta.env.VITE_API_URL + "/link/" + params.id);

  if (!res.ok) {
    return { error: "File not found" };
  }

  const data = await res.json();
  return data;
}

const getFileName = (url: string) => {
  const parts = url.split("/");
  return parts[4].split("?")[0];
};

export default function Files({ loaderData }: Route.ComponentProps) {
  if (loaderData.error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-4">
        <div className="container mx-auto px-4 flex flex-col gap-3">
          <div className="flex flex-row mx-auto justify-center items-center space-x-3">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-bold text-center text-blue-800"
              viewTransition
            >
              Chillfile
            </Link>
            <img src="/192.png" alt="Chillfile Logo" width={50} height={50} />
          </div>
          <p className="text-center text-blue-700 text-lg sm:text-xl">
            Share files at the speed of thought.
          </p>
          <Card className="max-w-2xl mx-auto  bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-2 flex flex-row justify-between">
              <Link
                to="/"
                viewTransition
                className="text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="h-7 w-7" />
              </Link>
              <CardTitle className="text-blue-700 text-base sm:text-xl">
                Error
              </CardTitle>
              <div className="h-7 w-7" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-red-50 border-red-200 py-3">
                <InfoIcon className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-red-700 text-sm sm:text-base">
                  The requested file could not be found.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const { files, limit } = loaderData;

  const uploadedFiles: FileType[] = files.map((file) => ({
    id: file.id,
    name: getFileName(file.url),
    downloaded: file.downloaded,
    limit,
  }));

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
        <Card className="max-w-2xl mx-auto  bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-2 flex flex-row justify-between">
            <Link
              to="/"
              viewTransition
              className="text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-7 w-7" />
            </Link>
            <CardTitle className="text-blue-700 text-base sm:text-xl">
              Share Your Files
            </CardTitle>
            <div className="h-7 w-7" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <ShareLink />
              <FileList files={uploadedFiles} />
            </div>

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
