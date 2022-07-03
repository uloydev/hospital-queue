<?php

namespace App\Controllers;

// controller ini bawaan dari ci, sebenernya ga dipake buat frontendnya
class HomeController extends BaseController
{
    public function index()
    {
        return view('welcome_message');
    }
}
