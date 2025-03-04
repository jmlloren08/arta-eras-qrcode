import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useRef } from "react";

export default function Dashboard({ qrCode, qrText }) {
    const imgRef = useRef(null);
    const canvasRef = useRef(null);
    // Download QR Code
    const downloadQrCode = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const img = imgRef.current;
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        // Draw image to canvas
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
        // Create PNG Download
        const pngUrl = canvas.toDataURL("image/png");
        // Trigger download
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `${qrText}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="flex flex-col items-center p-6">
                            <img
                                ref={imgRef}
                                src={qrCode}
                                alt={qrText}
                                className="mb-4"
                            />
                            <button
                                onClick={downloadQrCode}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Download QR Code
                            </button>
                            {/* Hidden canvas for PNG conversion */}
                            <canvas
                                ref={canvasRef}
                                style={{ display: "none", margin: 3 }}
                            />
                        </div>
                        {/* <div className="p-6">
                            <QrCodeScanner key={activeTab} />
                        </div> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
