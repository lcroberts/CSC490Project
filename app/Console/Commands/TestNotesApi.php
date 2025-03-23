<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class TestNotesApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-notes-api {user} {note_path}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Auth::loginUsingId($this->argument('user'));

        print_r(app()->handle(Request::create('/api/notes', 'GET'))->getContent());
        print_r(app()->handle(Request::create('/api/media/1', 'GET'))->getContent());

        Auth::logout();
    }
}
