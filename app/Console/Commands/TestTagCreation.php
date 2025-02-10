<?php

namespace App\Console\Commands;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

class TestTagCreation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-tag-creation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Tests tag creation prompts (will result in small charge)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Auth::loginUsingId(1);

        print_r(Tag::generateAndSave(
            "Class: ENG201 (Section This Totally Is Real) - Samuel Johnson
            Firstly: show and tell exist on a spectrum. You shouldn't always tell either - the rule of thumb is just that people are more likely to tell too much and not show enough, and as such the common writing advice exists.
            Secondly, when you get down to it, horror as a genre is really fundamentally about the modulation of constant tension. In that way, it's a little bit similar to the thriller, but quite different from the story structures more common in sff (though, obviously, there's a lot of crosspollination), so a lot of advice geared towards other genre fic doesn't work well when applied to it.
            Finally: an analysis commonly attributed to Orson Scott Card (obligatory yeah, he's kind of an awful person, but his writing advice has massively impacted the gestalt of writing advice in general) but honestly also expressed by a number of different authors in various ways is a fairly specific categorization system regarding modulating horror, from strongest (in the sense of best carrying narrative) emotion to weakest - you have dread, the tension of waiting for something unknown, that he considers the strongest form of fear and the best for novelist purposes; terror, the revelation of the unknown, that freezes you in place and engages the fight/flight response; and horror, the feeling of the aftereffects of the now known threat (nausea, pity for yourself and others, etc.). It's the reaction to a horrifying event, which he identifies as the weakest due to it easily becoming numb upon repeated experience.
        Now, this is a pretty common analysis, as I said, and the initial impression (and common writing advice) is that you hold the actual visage or actions of the horror-inducing thing off for as long as possible to stretch out that dread. However - and I think IT is an especially good case study for this - there's other ways to invoke dread than the simple knowledge of the existence of the monster. As long as something is hanging over the story, something is looming, you still have that crucial ingredient. It's also possible to make do without any of that at all - the dread->terror->horror escalation and deescalation is one way to invoke tension and keep a story interesting, but it's definitely not the only way. Marble Hornets having a mystery component definitely is a big part of why it works there; it's the Scooby Doo formula."
        )); // Note sourced from myself on discord

        print_r(Tag::index());

        Auth::logout();
    }
}
