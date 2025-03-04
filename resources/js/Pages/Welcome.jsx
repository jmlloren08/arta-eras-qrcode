import QrCodeScanner from "@/Components/QrCodeScanner";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Welcome({ users }) {
    const handleSuccessfulScan = () => {
        router.reload();
    };
    return (
        <AuthenticatedLayout>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:text-white">
                    <div className="relative w-full max-w-full mx-auto">
                        {/* Main Content Section */}
                        <main className="mt-6 flex flex-col items-center space-y-10">
                            {/* QR Scanner Section - Centered at the top */}
                            <div className="flex justify-center w-full">
                                <div className="max-w-md w-full">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                        <QrCodeScanner
                                            onSuccessfulScan={
                                                handleSuccessfulScan
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* User Information Table - Centered below QR scanner */}
                            <div className="w-full max-w-full mx-auto">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                                    Attendance Sheet
                                </h2>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                    <div className="w-full p-2 overflow-x-auto">
                                        <table className="w-full table-auto border-collapse text-sm">
                                            <thead className="text-left bg-gray-100 dark:bg-gray-700">
                                                <tr>
                                                    <th className="p-2 border-b font-medium">
                                                        Last Name
                                                    </th>
                                                    <th className="p-2 border-b font-medium">
                                                        First Name
                                                    </th>
                                                    <th className="p-2 border-b font-medium">
                                                        Middle Name
                                                    </th>
                                                    <th className="p-2 border-b font-medium text-center">
                                                        Sex
                                                    </th>
                                                    <th className="p-2 border-b font-medium text-center">
                                                        PWD
                                                    </th>
                                                    <th className="p-2 border-b font-medium text-center">
                                                        Senior Citizen
                                                    </th>
                                                    <th className="p-2 border-b font-medium">
                                                        Company
                                                    </th>
                                                    <th className="p-2 border-b font-medium">
                                                        Designation
                                                    </th>
                                                    <th className="p-2 border-b font-medium">
                                                        Contact No.
                                                    </th>
                                                    <th className="p-2 border-b font-medium">
                                                        Email Address
                                                    </th>
                                                    <th className="p-2 border-b font-medium">
                                                        Attendance
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user) => (
                                                    <tr
                                                        key={user.id}
                                                        className="hover:bg-gray-50 dark:hover:bg-gray-750"
                                                    >
                                                        <td className="p-2 border-b">
                                                            {user.lastname}
                                                        </td>
                                                        <td className="p-2 border-b">
                                                            {user.firstname}
                                                        </td>
                                                        <td className="p-2 border-b">
                                                            {user.middlename}
                                                        </td>
                                                        <td className="p-2 border-b text-center">
                                                            {user.sex === "Male"
                                                                ? "M"
                                                                : "F"}
                                                        </td>
                                                        <td className="p-2 border-b text-center">
                                                            {user.person_with_disability
                                                                ? "Y"
                                                                : "N"}
                                                        </td>
                                                        <td className="p-2 border-b text-center">
                                                            {user.senior_citizen
                                                                ? "Y"
                                                                : "N"}
                                                        </td>
                                                        <td className="p-2 border-b">
                                                            {user.company}
                                                        </td>
                                                        <td className="p-2 border-b">
                                                            {user.designation}
                                                        </td>
                                                        <td className="p-2 border-b">
                                                            {
                                                                user.contact_number
                                                            }
                                                        </td>
                                                        <td className="p-2 border-b">
                                                            {user.email}
                                                        </td>
                                                        <td className="p-2 border-b">
                                                            <div className="flex items-center space-x-2">
                                                                {user.qrCode && (
                                                                    <img
                                                                        src={
                                                                            user.qrCode
                                                                        }
                                                                        alt={
                                                                            user.qrText ||
                                                                            `QR code for ${user.firstname} ${user.lastname}`
                                                                        }
                                                                        className="w-12 h-12"
                                                                    />
                                                                )}
                                                                <div className="text-xs">
                                                                    {user.attendances &&
                                                                        user.attendances.map(
                                                                            (
                                                                                attendance
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        attendance.id
                                                                                    }
                                                                                    className="whitespace-nowrap"
                                                                                >
                                                                                    {attendance.time_in
                                                                                        ? new Date(
                                                                                              attendance.time_in
                                                                                          ).toLocaleString(
                                                                                              [],
                                                                                              {
                                                                                                  month: "short",
                                                                                                  day: "2-digit",
                                                                                                  hour: "2-digit",
                                                                                                  minute: "2-digit",
                                                                                              }
                                                                                          )
                                                                                        : ""}
                                                                                    {attendance.time_out &&
                                                                                        " - " +
                                                                                            new Date(
                                                                                                attendance.time_out
                                                                                            ).toLocaleTimeString(
                                                                                                [],
                                                                                                {
                                                                                                    hour: "2-digit",
                                                                                                    minute: "2-digit",
                                                                                                }
                                                                                            )}
                                                                                </div>
                                                                            )
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </main>
                        {/* Footer Section */}
                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            ARTA-ERAS v1.0.0
                        </footer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
