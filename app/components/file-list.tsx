import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Download } from "lucide-react";
import { useFetcher, useLocation, useParams } from "react-router";
import { Route } from ".react-router/types/app/views/+types/files";
import { useState } from "react";

export interface FileType {
  id: string;
  name: string;
  downloaded: number;
  limit: number;
}

interface FileListProps {
  files: FileType[];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  return request;
}

export function FileList(props: FileListProps) {
  const { files } = props;
  const params = useParams();
  const [loading, setLoading] = useState<string | null>(null);

  const handleClick = async (id: string) => {
    setLoading(id);
    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/download/" + params.id + "/" + id
      );
      const { url } = await res.json();
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setLoading(null);
    }
  };
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-blue-700">Uploaded Files</h2>
      <ul className="space-y-2">
        {files.map((file) => (
          <li
            key={file.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between space-y-1 sm:space-y-0 sm:space-x-2 p-3 bg-blue-50 rounded-lg shadow-sm"
          >
            <div className="flex-grow min-w-0">
              <p className="font-medium text-blue-800 text-base truncate text-wrap">
                {file.name}
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
              onClick={() => handleClick(file.id)}
              variant="outline"
              size="sm"
              type="submit"
              className="bg-white text-blue-600 hover:bg-blue-50 text-sm py-2 h-auto flex-shrink-0"
              disabled={loading === file.id || file.downloaded >= file.limit}
            >
              <Download className="mr-2 h-4 w-4" />
              {loading === file.id ? "Loading.." : "Download"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
