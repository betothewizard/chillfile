import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Download } from "lucide-react";

export interface FileType {
  name: string;
  downloaded: number;
  limit: number;
}

interface FileListProps {
  files: FileType[];
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
            <div className="flex-grow min-w-0">
              <p className="font-medium text-blue-800 text-base truncate">
                {file.name[0]}
              </p>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <span>
                  {file.downloaded} / {file.limit} downloads
                </span>
                <Progress
                  value={(file.downloaded / file.limit) * 100}
                  className="w-24"
                />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-blue-600 hover:bg-blue-50 text-sm py-2 h-auto flex-shrink-0"
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
