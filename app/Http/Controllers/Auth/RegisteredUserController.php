<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'sex' => 'required|string|max:255',
            'person_with_disability' => 'required|boolean',
            'senior_citizen' => 'required|boolean',
            'company' => 'nullable|string|max:255',
            'designation' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:255',
            'qrcode_path' => 'nullable|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['lastname'] . ' ' . $validated['firstname'] . ' ' . $validated['middlename'],
            'lastname' => $validated['lastname'],
            'firstname' => $validated['firstname'],
            'middlename' => $validated['middlename'],
            'sex' => $validated['sex'],
            'person_with_disability' => $validated['person_with_disability'],
            'senior_citizen' => $validated['senior_citizen'],
            'company' => $validated['company'],
            'designation' => $validated['designation'],
            'contact_number' => $validated['contact_number'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
        // Generate QR Code with user id
        $qrCodeData = QrCode::size(300)
            ->margin(3)
            ->format('svg')
            ->generate(route('dashboard', ['user' => $user->id]));
        // Store the QR Code as a based64 string
        $user->update([
            'qrcode_path' => null,
        ]);

        event(new Registered($user));
        Auth::login($user);
        return redirect(route('dashboard', absolute: false));
    }
}
