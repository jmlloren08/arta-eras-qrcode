import { BrowserMultiFormatReader } from "@zxing/browser";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const QrCodeScanner = ({ onSuccessfulScan }) => {
    const videoRef = useRef(null);
    const [scanning, setScanning] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const codeReaderRef = useRef(null);
    const processingQrCode = useRef(false);
    // Initialize code reader
    useEffect(() => {
        codeReaderRef.current = new BrowserMultiFormatReader();
        return () => stopScanner();
    }, []);
    // Start the scanner
    const startScanner = async () => {
        try {
            setScanning(true);
            processingQrCode.current = false;
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                startQrDecoding();
            }
        } catch (error) {
            setErrorMsg(`Unable to access camera: ${error.message}`);
            setScanning(false);
        }
    };

    // Stop the scanner
    const stopScanner = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject
                .getTracks()
                .forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
        setScanning(false);
        try {
            if (codeReaderRef.current) {
                codeReaderRef.current.reset();
            }
        } catch (error) {
            console.error("Error stopping scanner:", error);
        }
    };
    // Start QR code decoding
    const startQrDecoding = () => {
        if (!videoRef.current || !codeReaderRef.current) return;
        try {
            console.log("Scanning for QR code...");
            codeReaderRef.current.decodeFromVideoDevice(
                undefined,
                videoRef.current,
                async (result, err) => {
                    if (err) {
                        return;
                    }
                    if (result && !processingQrCode.current) {
                        processingQrCode.current = true;
                        console.log("QR Code Detected: ", result.text);
                        await processQrCode(result.text);
                        processingQrCode.current = false;
                    }
                }
            );
        } catch (error) {
            console.error("QR scanning failed: ", error);
            setErrorMsg(`QR scanning failed: ${error.message}`);
        }
    };
    // Process the detected QR code
    const processQrCode = async (userId) => {
        try {
            // Retrieve CSRF token from the meta tag
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");
            // Fetch user details & attendance record
            const response = await fetch(
                `/auth/verified/attendance/scan/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    credentials: "include",
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: errorData.error,
                });
                return;
            }
            const data = await response.json();
            // Check if user doesn't exist
            if (!data.user) {
                await Swal.fire({
                    icon: "error",
                    title: "User Not Found",
                    text: "This QR code does not match any registered user.",
                });
                return;
            }
            // If user has already scanned in and out for today
            if (
                data.attendance &&
                data.attendance.time_in &&
                data.attendance.time_out
            ) {
                await Swal.fire({
                    icon: "error",
                    title: "Already Time In & Out",
                    text: "You have already scanned in and out for today.",
                });
                return;
            }
            // Show confirmation popup
            const { isConfirmed } = await Swal.fire({
                icon: "question",
                title: "Confirm Your Identity",
                html: `
                    <p><strong>Name:</strong> ${data.user.firstname} ${
                    data.user.lastname
                } ${data.user.middlename}</p>
                    <p><strong>Company:</strong> ${
                        data.user.company || "N/A"
                    }</p>
                    <p><strong>Designation:</strong> ${
                        data.user.designation || "N/A"
                    }</p>
                    <p><strong>Current Status:</strong> ${
                        data.attendance
                            ? data.attendance.time_out
                                ? "Already Timed Out"
                                : "Already Timed In"
                            : "Not Yet Timed In"
                    }</p>
                    <p class="mt-3">Is this information correct?</p>
                `,
                showCancelButton: true,
                confirmButtonText: "Yes, That's Me",
                cancelButtonText: "No, Cancel",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
            });
            // If user cancels, do nothing
            if (!isConfirmed) return;
            // Proceed with creating/updating attendance
            const updateResponse = await fetch(
                `/auth/verified/attendance/update/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    credentials: "include",
                }
            );
            if (!updateResponse.ok) {
                const updateErrorData = await updateResponse.json();
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: updateErrorData.error,
                });
                return;
            }
            const updateData = await updateResponse.json();
            // Show seating assignment and success message
            await Swal.fire({
                icon: "success",
                title: updateData.success,
                html: `
                    <p><strong>Welcome, ${
                        updateData.user.firstname
                    }!</strong></p>
                    <p class="mt-3">Your seating details:</p>
                    <div class="p-3 bg-light rounded mt-2">
                        <p><strong>Sector:</strong> ${
                            updateData.user.sector || "N/A"
                        }</p>
                        <p><strong>Table Assignment:</strong> ${
                            updateData.user.table || "N/A"
                        }</p>
                    </div>
                    <p class="mt-3">Please proceed to your assigned location.</p>
                `,
                confirmButtonText: "Got It",
                confirmButtonColor: "#28a745",
            });
            // Call the callback to refresh the data after successful scan
            if (typeof onSuccessfulScan === "function") {
                onSuccessfulScan();
            }
        } catch (error) {
            console.error("Error processing QR code:", error);
            await Swal.fire({
                icon: "error",
                title: "Error",
                text: "An unexpected error occurred while processing the QR code.",
            });
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold">QR Code Scanner</h2>
            <div className="relative w-full max-w-md mb-4 overflow-hidden bg-black rounded-lg">
                <video
                    ref={videoRef}
                    className="w-full"
                    playsInline
                    muted
                ></video>
            </div>
            <div className="flex space-x-4">
                {!scanning ? (
                    <button
                        onClick={startScanner}
                        className={`px-4 py-2 text-white text-xs bg-blue-600 rounded-md hover:bg-blue-700 ${
                            scanning && "opacity-50 cursor-not-allowed"
                        }`}
                    >
                        Start Scanning
                    </button>
                ) : (
                    <button
                        onClick={stopScanner}
                        className="px-4 py-2 text-white text-xs bg-red-600 rounded-md hover:bg-red-700"
                    >
                        <span className="flex items-center justify-center">
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="inline mr-3 w-4 h-4 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                ></path>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            Stop Scanning
                        </span>
                    </button>
                )}
            </div>
            {errorMsg && <p className="mt-2 text-red-500">{errorMsg}</p>}
        </div>
    );
};

export default QrCodeScanner;
