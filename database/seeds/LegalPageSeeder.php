<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class LegalPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('legal_pages')->truncate();

        $slugs = [
            "payment-policy",
            "privacy-policy",
            "terms-and-conditions",
            "disclaimer",
            "cookie-content",
        ];
        foreach($slugs as $slug)
        {

            $admin = \App\Models\LegalPage::create([
                'slug'=>$slug,
            ]);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        Model::reguard();
    }
}
