import { BrowserMultiFormatReader } from "@zxing/browser";
import axios from "axios";
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
                video: { facingMode: "user" },
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
            // Fetch user details & attendance record
            const response = await axios.post(
                `/auth/verified/attendance/scan/${userId}`
            );
            const data = await response.data;
            // Check if user doesn't exist
            if (!data.user) {
                await Swal.fire({
                    icon: "error",
                    title: "User Not Found",
                    text: response.data?.error,
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
                    title: data.error,
                    text: data.message,
                });
                return;
            }
            // Confirmation Popup
            const { isConfirmed } = await Swal.fire({
                icon: "info",
                title: "Confirm Attendance Details",
                html: `
                    <div class="text-left">
                        <h3 class="text-lg font-semibold mb-3">Please Verify Your Information</h3>
                        <p><strong>Name:</strong> ${data.user.firstname} ${
                    data.user.lastname
                } ${data.user.middlename}</p>
                        <p><strong>Company:</strong> ${
                            data.user.company || "N/A"
                        }</p>
                        <p><strong>Designation:</strong> ${
                            data.user.designation || "N/A"
                        }</p>
                        <p><strong>Current Attendance Status:</strong> 
                            ${
                                data.attendance
                                    ? data.attendance.time_out
                                        ? "Already Timed Out"
                                        : "Already Timed In"
                                    : "Not Yet Timed In"
                            }
                        </p>
                        <p class="mt-3 text-gray-600">Are you sure you want to proceed with marking attendance?</p>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: "Yes, Proceed",
                cancelButtonText: "No, Cancel",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
            });
            // If user cancels, do nothing
            if (!isConfirmed) return;
            // Proceed with creating/updating attendance
            const updateResponse = await axios.post(
                `/auth/verified/attendance/update/${userId}`
            );
            const updateData = await updateResponse.data;
            // Success Message
            await Swal.fire({
                icon: "success",
                title: updateData.success,
                // text: updateData.message,
                html: `
                    <div class="text-left">
                        <h3 class="text-lg font-semibold mb-3">Attendance Details</h3>
                        <p><strong>Assigned Sector:</strong> ${
                            updateData.user.sector || "Not Specified"
                        }</p>
                        <p><strong>Assigned Table:</strong> ${
                            updateData.user.table || "Not Assigned"
                        }</p>
                        <p class="mt-3 text-center text-green-600">${updateData.message}</p>
                    </div>
                `,
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
            });
            // Call the callback to refresh the data after successful scan
            if (typeof onSuccessfulScan === "function") {
                onSuccessfulScan();
            }
        } catch (error) {
            console.error("Error processing QR code:", error);
            let errorMessage = "An unknown error occurred";
            if (error.response) {
                // The request was made and the server responded with a status code
                errorMessage =
                    error.response.data.message ||
                    error.response.data.error ||
                    `Server error: ${error.response.status}`;
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage =
                    "No response received from server. Please check your network connection.";
            }
            await Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
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
