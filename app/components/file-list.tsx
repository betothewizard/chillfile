import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Download } from "lucide-react";

interface File {
  name: string;
  downloads: number;
  limit: number;
}

interface FileListProps {
  files: File[];
}

export function FileList({ files }: FileListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-blue-700">Uploaded Files</h2>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between space-y-1 sm:space-y-0 sm:space-x-2 p-3 bg-blue-50 rounded-lg shadow-sm"
          >
            <div className="flex-grow">
              <p className="font-medium text-blue-800 text-base">{file.name}</p>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <span>
                  {file.downloads} / {file.limit} downloads
                </span>
                <Progress
                  value={(file.downloads / file.limit) * 100}
                  className="w-24"
                />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-blue-600 hover:bg-blue-50 text-sm py-2 h-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
