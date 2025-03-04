import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        lastname: "",
        firstname: "",
        middlename: "",
        sex: "",
        person_with_disability: false,
        senior_citizen: false,
        company: "",
        designation: "",
        contact_number: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div>
            <Head title="Register" />
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <aside className="relative block h-16 lg:h-full xl:col-span-6">
                        <img
                            alt="ARTA Banner"
                            src="/storage/images/bg/arta-eras-registration-banner.svg"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </aside>
                    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                        <div className="max-w-xl lg:max-w-3xl">
                            <a className="block text-blue-600" href="#">
                                <span className="sr-only">Home</span>
                                <img
                                    className="w-24 h-24"
                                    src="/storage/images/logos/arta-logo.png"
                                    alt="ARTA Logo"
                                />
                            </a>
                            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                Welcome!
                            </h1>
                            <p className="mt-4 leading-relaxed text-gray-500">
                                Create an account to register for events and
                                track your attendance using our QR code system.
                            </p>
                            <form onSubmit={submit} className="mt-8 space-y-8">
                                {/* Personal Information Section */}
                                <div className="space-y-2">
                                    <h2 className="text-lg font-medium text-gray-800">
                                        Personal Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label
                                                htmlFor="firstname"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstname"
                                                name="firstname"
                                                value={data.firstname}
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "firstname",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                            />
                                            <InputError
                                                message={errors.firstname}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="lastname"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastname"
                                                name="lastname"
                                                value={data.lastname}
                                                onChange={(e) =>
                                                    setData(
                                                        "lastname",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                            />
                                            <InputError
                                                message={errors.lastname}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="middlename"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Middle Name
                                            </label>
                                            <input
                                                type="text"
                                                id="middlename"
                                                name="middlename"
                                                value={data.middlename}
                                                onChange={(e) =>
                                                    setData(
                                                        "middlename",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                            />
                                            <InputError
                                                message={errors.middlename}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Contact Information Section */}
                                <div className="space-y-2">
                                    <h2 className="text-lg font-medium text-gray-800">
                                        Contact Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="contact_number"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Contact Number
                                            </label>
                                            <input
                                                type="text"
                                                id="contact_number"
                                                name="contact_number"
                                                value={data.contact_number}
                                                onChange={(e) =>
                                                    setData(
                                                        "contact_number",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                            />
                                            <InputError
                                                message={errors.contact_number}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Professional Information Section */}
                                <div className="space-y-2">
                                    <h2 className="text-lg font-medium text-gray-800">
                                        Professional Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="company"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Company/Organization
                                            </label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={data.company}
                                                onChange={(e) =>
                                                    setData(
                                                        "company",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                            />
                                            <InputError
                                                message={errors.company}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="designation"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Designation
                                            </label>
                                            <input
                                                type="text"
                                                id="designation"
                                                name="designation"
                                                value={data.designation}
                                                onChange={(e) =>
                                                    setData(
                                                        "designation",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                            />
                                            <InputError
                                                message={errors.designation}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Additional Information Section */}
                                <div className="space-y-2">
                                    <h2 className="text-lg font-medium text-gray-800">
                                        Additional Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex">
                                        <div>
                                            <label
                                                htmlFor="sex"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Sex
                                            </label>
                                            <select
                                                id="sex"
                                                name="sex"
                                                value={data.sex}
                                                onChange={(e) =>
                                                    setData(
                                                        "sex",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                            >
                                                <option value="">Select</option>
                                                <option value="Male">
                                                    Male
                                                </option>
                                                <option value="Female">
                                                    Female
                                                </option>
                                            </select>
                                            <InputError message={errors.sex} />
                                        </div>
                                        <div className="flex items-center">
                                            <label
                                                htmlFor="person_with_disability"
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="person_with_disability"
                                                    name="person_with_disability"
                                                    checked={
                                                        data.person_with_disability
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "person_with_disability",
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="size-5 rounded-md border-gray-200 bg-white shadow-xs"
                                                />
                                                <span className="text-sm text-gray-500">
                                                    Person with Disability
                                                </span>
                                            </label>
                                            <InputError
                                                message={
                                                    errors.person_with_disability
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <label
                                                htmlFor="senior_citizen"
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="senior_citizen"
                                                    name="senior_citizen"
                                                    checked={
                                                        data.senior_citizen
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "senior_citizen",
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="size-5 rounded-md border-gray-200 bg-white shadow-xs"
                                                />
                                                <span className="text-sm text-gray-500">
                                                    Senior Citizen
                                                </span>
                                            </label>
                                            <InputError
                                                message={errors.senior_citizen}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Account Security Section */}
                                <div className="space-y-2">
                                    <h2 className="text-lg font-medium text-gray-800">
                                        Account Security
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                            />
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password_confirmation"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                            />
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Terms and Marketing Section */}
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="MarketingAccept"
                                            className="flex gap-4"
                                        >
                                            <input
                                                type="checkbox"
                                                id="MarketingAccept"
                                                name="marketing_accept"
                                                className="size-5 rounded-md border-gray-200 bg-white shadow-xs"
                                            />
                                            <span className="text-sm text-gray-700">
                                                I want to receive emails about
                                                events, services updates and
                                                authority's announcements.
                                            </span>
                                        </label>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        By creating an account, you agree to our
                                        <a
                                            href="#"
                                            className="text-gray-700 underline"
                                        >
                                            {" "}
                                            terms and conditions{" "}
                                        </a>
                                        and
                                        <a
                                            href="#"
                                            className="text-gray-700 underline"
                                        >
                                            {" "}
                                            privacy policy
                                        </a>
                                        .
                                    </p>
                                </div>
                                {/* Form Actions */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                    <button
                                        className={`inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-800 focus:ring-3 focus:outline-hidden ${
                                            processing && "opacity-50 cursor-not-allowed"
                                        }`}
                                        disabled={processing}
                                    >
                                        {processing ? (
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
                                                Please wait...
                                            </span>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </button>
                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?
                                        <Link
                                            href={route("login")}
                                            className="text-gray-700 underline"
                                        >
                                            {" "}
                                            Log in
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
}
