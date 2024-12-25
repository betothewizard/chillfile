import { Route } from "./+types/files";
import { FileList, FileType } from "~/components/file-list";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Link } from "react-router";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { ShareLink } from "~/components/share-link";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(import.meta.env.VITE_API_URL + "/link/" + params.id);
  const data = await res.json();
  console.log(data);
  return data;
}

export default function Files({ loaderData }: Route.ComponentProps) {
  const { files, limit } = loaderData;

  const uploadedFiles: FileType[] = files.map((file) => ({
    name: file.url,
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
