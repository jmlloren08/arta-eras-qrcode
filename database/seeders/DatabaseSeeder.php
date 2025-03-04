<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Smith Jane A',
            'lastname' => 'Smith',
            'firstname' => 'Jane',
            'middlename' => 'A',
            'sex' => 'Female',
            'person_with_disability' => false,
            'senior_citizen' => false,
            'company' => 'Tech Innovators',
            'designation' => 'Manager',
            'contact_number' => '987-654-3210',
            'qrcode_path' => null,
            'email' => 'jane.smith@arta.gov.ph',
            'password' => Hash::make('password'),
        ]);

        User::factory()->create([
            'name' => 'Johnson Mike B',
            'lastname' => 'Johnson',
            'firstname' => 'Mike',
            'middlename' => 'B',
            'sex' => 'Male',
            'person_with_disability' => false,
            'senior_citizen' => false,
            'company' => 'Acme Corp',
            'designation' => 'Analyst',
            'contact_number' => '555-555-5555',
            'qrcode_path' => null,
            'email' => 'mike.johnson@arta.gov.ph',
            'password' => Hash::make('password'),
        ]);

        User::factory()->create([
            'name' => 'Brown Emily C',
            'lastname' => 'Brown',
            'firstname' => 'Emily',
            'middlename' => 'C',
            'sex' => 'Female',
            'person_with_disability' => true,
            'senior_citizen' => false,
            'company' => 'Global Solutions',
            'designation' => 'Consultant',
            'contact_number' => '444-444-4444',
            'qrcode_path' => null,
            'email' => 'emily.brown@arta.gov.ph',
            'password' => Hash::make('password'),
        ]);

        User::factory()->create([
            'name' => 'Davis Chris D',
            'lastname' => 'Davis',
            'firstname' => 'Chris',
            'middlename' => 'D',
            'sex' => 'Male',
            'person_with_disability' => false,
            'senior_citizen' => true,
            'company' => 'Enterprise Inc',
            'designation' => 'Director',
            'contact_number' => '333-333-3333',
            'qrcode_path' => null,
            'email' => 'chris.davis@arta.gov.ph',
            'password' => Hash::make('password'),
        ]);

        User::factory()->create([
            'name' => 'Miller Lisa E',
            'lastname' => 'Miller',
            'firstname' => 'Lisa',
            'middlename' => 'E',
            'sex' => 'Female',
            'person_with_disability' => false,
            'senior_citizen' => false,
            'company' => 'Creative Works',
            'designation' => 'Designer',
            'contact_number' => '222-222-2222',
            'qrcode_path' => null,
            'email' => 'lisa.miller@arta.gov.ph',
            'password' => Hash::make('password'),
        ]);
    }
}
