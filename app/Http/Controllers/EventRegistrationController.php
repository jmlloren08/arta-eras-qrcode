<?php

namespace App\Http\Controllers;

use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class EventRegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $qrText = Str::uuid();
        $qrCodeData = QrCode::size(300)
            ->margin(3)
            ->format('svg')
            ->generate($qrText);

        return Inertia::render('Dashboard', [
            'qrCode' => 'data:image/svg+xml;base64,' . base64_encode($qrCodeData),
            'qrText' => $qrText,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EventRegistration $eventRegistration)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EventRegistration $eventRegistration)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventRegistration $eventRegistration)
    {
        //
    }
    public function download()
    {
        // return response()->streamDownload(
        //     function () {
        //         echo QrCode::size(200)
        //             ->format('png')
        //             ->generate('Juan Dela Cruz');
        //     },
        //     'qr-code.png',
        //     [
        //         'Content-Type' => 'image/png',
        //     ]
        // );
    }
}
