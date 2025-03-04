import { Head, Link } from "@inertiajs/react";

const Error = ({ error }) => {
    return (
        <>
            <Head title="Error" />
            <section className="flex items-center h-full p-16 text-gray-100">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl text-red-600">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl text-gray-400">
                            Sorry, we couldn't find this page.
                        </p>
                        <p className="mt-4 mb-8 text-gray-400 font-regular">
                            {error}
                        </p>
                        <Link
                            rel="noopener noreferrer"
                            href="/"
                            className="px-8 py-3 font-semibold rounded bg-red-600"
                        >
                            Back to homepage
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Error;
