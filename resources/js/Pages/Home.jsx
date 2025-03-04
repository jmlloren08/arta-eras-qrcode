import { Head } from "@inertiajs/react";

const Home = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Home" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        {/* QR Scanner Section */}
                        <div className="p-6">
                            {/* Main Content Section */}
                            <main className="mt-6 flex flex-col items-center space-y-10">
                                {/* QR Scanner Section - Centered at the top */}
                                <div className="flex justify-center w-full">
                                    <div className="max-w-md w-full">
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                                            Scan QR Code
                                        </h2>
                                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                            <QrCodeScanner
                                                userId={userId}
                                                userData={userData}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* User Information Table - Centered below QR scanner */}
                                <div className="w-full">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                                        Attendance Sheet
                                    </h2>
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
                                        <table className="w-full table-auto border-collapse text-xs">
                                            <thead className="text-left bg-gray-100 dark:bg-gray-700">
                                                <tr>
                                                    <th className="p-2 border-b">
                                                        Last Name
                                                    </th>
                                                    <th className="p-2 border-b">
                                                        First Name
                                                    </th>
                                                    <th className="p-2 border-b">
                                                        Middle Name
                                                    </th>
                                                    <th className="p-2 border-b transform -rotate-90 text-center">
                                                        Sex
                                                    </th>
                                                    <th className="p-2 border-b transform -rotate-90 text-center">
                                                        PWD
                                                    </th>
                                                    <th className="p-2 border-b transform -rotate-90 text-center">
                                                        Senior
                                                        <br />
                                                        Citizen
                                                    </th>
                                                    <th className="p-2 border-b">
                                                        Company
                                                    </th>
                                                    <th className="p-2 border-b">
                                                        Designation
                                                    </th>
                                                    <th className="p-2 border-b">
                                                        Contact No.s
                                                    </th>
                                                    <th className="p-2 border-b">
                                                        Email Address
                                                    </th>
                                                    <th className="p-2 border-b">
                                                        Signature
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Home;
