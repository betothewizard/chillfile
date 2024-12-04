import React, { useState, useCallback } from "react";
import { Upload, FileIcon, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Notification } from "~/components/ui/notification";
import { useNavigate } from "react-router";
import FilesPage from "~/views/files";

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url: string;
}

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [expiration, setExpiration] = useState("1h");
  const [downloadLimit, setDownloadLimit] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [filePageUrl, setFilePageUrl] = useState("");
  const navigate = useNavigate();
  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setNotification({ message, type });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleUpload = async () => {
    if (files.length > 0) {
      setIsLoading(true);
      setUploadProgress(0);

      try {
        // Simulate file upload process
        for (let i = 0; i < files.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate upload time for each file
          setUploadProgress((prev) => prev + 100 / files.length);
        }

        // Generate mock Azure Blob SAS URLs for each file
        const uploadedFiles: UploadedFile[] = files.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: `https://chillfilestorage.blob.core.windows.net/uploads/${file.name}?sv=2020-08-04&st=2023-06-01T00%3A00%3A00Z&se=2023-06-02T00%3A00%3A00Z&sr=b&sp=r&sig=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`,
        }));

        setUploadedFiles(uploadedFiles);

        // Generate a mock file page URL
        const filePageId = Math.random().toString(36).substr(2, 9);
        const mockFilePageUrl = `/files/${filePageId}`;
        setFilePageUrl(mockFilePageUrl);

        showNotification("Files uploaded successfully!");

        // Simulate navigation to the file page

        // navigate(mockFilePageUrl);
      } catch (error) {
        showNotification("Upload failed. Please try again.", "error");
      } finally {
        setIsLoading(false);
        setUploadProgress(100);
      }
    }
  };

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

  const UploadView = () => (
    <div className="animate-fade-in">
      <div
        className="border-2 border-dashed border-blue-300 rounded-lg p-8 mb-6 text-center cursor-pointer transition-colors hover:border-blue-500"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <Upload className="mx-auto text-blue-500 mb-4" size={48} />
        <p className="text-blue-600 mb-2">Drag and drop your files here</p>
        <p className="text-sm text-blue-400">or click to select files</p>
        <Input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
      </div>
      {files.length > 0 && (
        <div className="mb-4 animate-fade-in">
          <p className="text-blue-600 mb-2">Selected files:</p>
          <ul className="text-sm text-blue-500">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FileIcon size={16} className="mr-2" />
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-6">
        <Label htmlFor="expiration" className="text-blue-600 mb-2 block">
          Expiration Time
        </Label>
        <RadioGroup
          id="expiration"
          value={expiration}
          onValueChange={setExpiration}
          className="flex justify-between"
        >
          <div className="flex items-center">
            <RadioGroupItem value="1h" id="1h" />
            <Label htmlFor="1h" className="ml-2">
              1 hour
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="1d" id="1d" />
            <Label htmlFor="1d" className="ml-2">
              1 day
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="7d" id="7d" />
            <Label htmlFor="7d" className="ml-2">
              7 days
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="mb-6">
        <Label htmlFor="downloadLimit" className="text-blue-600 mb-2 block">
          Download Limit (1 for single download, 0 for unlimited)
        </Label>
        <Input
          id="downloadLimit"
          type="number"
          min={0}
          value={downloadLimit}
          onChange={(e) =>
            setDownloadLimit(Math.max(0, parseInt(e.target.value) || 0))
          }
          className="w-full"
        />
      </div>
      <Button
        onClick={handleUpload}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        disabled={files.length === 0}
      >
        Upload Files
      </Button>
    </div>
  );

  const LoadingView = () => (
    <div className="text-center animate-fade-in">
      <Loader2 className="animate-spin mx-auto text-blue-500 mb-4" size={48} />
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Uploading your files...
      </h2>
      <div className="w-full bg-blue-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
      <p className="text-sm text-blue-500">
        This may take a moment. Please don't close the page.
      </p>
    </div>
  );

  const FilePageView = () => (
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 flex flex-col justify-between">
      <header className="text-center py-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-blue-600">ChillFile</h1>
        <p className="text-xl text-blue-500 mt-2">Share files, the easy way</p>
      </header>

      <main className="container mx-auto px-4 flex-grow flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md animate-scale-in">
          {isLoading ? (
            <LoadingView />
          ) : filePageUrl ? (
            <FilePageView />
          ) : (
            <UploadView />
          )}
        </div>
      </main>

      <footer className="text-center py-4 text-blue-600 animate-fade-in">
        <p>&copy; 2023 ChillFile. Keep it cool, keep it simple.</p>
      </footer>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
