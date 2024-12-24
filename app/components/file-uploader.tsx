"use client";

import { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Loader2 } from "lucide-react";

interface FileUploaderProps {
  onUpload: (files: File[], limit: number) => void;
  isLoading: boolean;
}

export function FileUploader({ onUpload, isLoading }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [limit, setLimit] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload(files, limit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="file-upload" className="text-blue-700 text-lg">
          Choose files
        </Label>
        <div className="flex items-center space-x-2 mt-1">
          <Input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 py-3 text-base"
          >
            Select Files
          </Button>
          <span className="text-base text-blue-600">
            {files.length} file(s) selected
          </span>
        </div>
      </div>
      <div>
        <Label htmlFor="download-limit" className="text-blue-700 text-lg">
          Download limit
        </Label>
        <Input
          id="download-limit"
          type="number"
          min={1}
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
          className="mt-1 border-blue-200 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <Button
        type="submit"
        disabled={files.length === 0 || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload and Share"
        )}
      </Button>
    </form>
  );
}
