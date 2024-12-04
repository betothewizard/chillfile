import { ArrowLeft, FileIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { UploadedFile } from "~/views/home";

type FilesPageProp = {
  uploadedFiles: UploadedFile[];
  filePageUrl: string;
  showNotification: (message: string) => void;
};

export default function FilesPage(props: FilesPageProp) {
  const { uploadedFiles, filePageUrl, showNotification } = props;
  const navigate = useNavigate();

  const handleDownloadAll = () => {
    // In a real application, this would trigger downloads for all files
    showNotification("Downloading all files...");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Button onClick={() => navigate("/")} variant="ghost" className="mr-4">
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-blue-600">
          Your Uploaded Files
        </h2>
      </div>
      <div className="mb-4">
        <p className="text-blue-500">
          Share this page:{" "}
          <span className="font-medium">
            {window.location.origin}
            {filePageUrl}
          </span>
        </p>
      </div>
      <ul className="space-y-4 mb-6">
        {uploadedFiles.map((file, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center">
              <FileIcon size={24} className="text-blue-500 mr-3" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <Button asChild variant="outline">
              <a href={file.url} download={file.name}>
                Download
              </a>
            </Button>
          </li>
        ))}
      </ul>
      <Button
        onClick={handleDownloadAll}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
      >
        Download All Files
      </Button>
    </div>
  );
}
