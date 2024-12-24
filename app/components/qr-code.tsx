export function QRCode() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-lg font-semibold text-blue-700">Scan to Download</h2>
      <div className="p-2 bg-white rounded-lg shadow-md">
        <img
          src=""
          alt="QR Code"
          width={150}
          height={150}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
