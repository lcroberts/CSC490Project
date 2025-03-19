<?php

namespace App\Console\Commands;

use App\Models\Note;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

class TestDiskUpload extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-disk-upload {user} {note_path} {media*}';

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

        $content = file_get_contents($this->argument('note_path'));
        $id = Note::save(basename($this->argument('note_path')), $content);

        foreach($this->argument('media') as $media_path) {
            $content = file_get_contents($media_path);
            Note::attachMedia(basename($media_path), $id, $content);
        }

        print_r(Note::getNotesList());
        print_r(Note::getMediaList($id));

        print_r(Note::getById($id));

        Auth::logout();
    }
}
