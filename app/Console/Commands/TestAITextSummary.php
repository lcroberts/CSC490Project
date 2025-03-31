<?php

namespace App\Console\Commands;

use App\Models\Summary;
use Illuminate\Console\Command;

class TestAITextSummary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-a-i-text-summary';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Tests AI text summary prompts (will result in small charge)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $summary = Summary::generateTextSummary(
            "1-Knowledge Representation (1)
What is Knowledge?
•	Knowledge is an awareness of fact, a familiarity with individuals and situations, or a practical skill.
•	A refined and more advanced form of information.
•	Can be used in problem solving or inference systems.
Knowledge Representation
•	Knowledge Representation (KR, KRR) is the process of presenting information about the real world in a way that a computer system can comprehend and use.
•	Knowledge Representation in AI is not just about storing data in a database, it allows a machine to learn from that knowledge and behave intelligently like a human being.
Types of Represented Knowledge
•	Objects: All the information related to the objects present in our world.
•	Events: Numerous events that are taking place constantly in our world and the human perception of the events.
•	Performance: It describes a behavior involving knowledge about how to do things.
•	Facts: Knowledge based on the factual description of our world, such as the earth is not flat but not an exact round.
•	Meta Knowledge: Meta-knowledge is knowledge about knowledge. The term is used to describe things such as tags, models and taxonomies that describe knowledge.
•	Knowledge Base: A knowledge base is a collection of information related to any discipline.
Knowledge Representation Methods
•	Four general knowledge representation techniques:
o	Logical Representations
o	Semantic Networks
o	Frame Representation
o	Production Rules
",
        true, 1, true); // Note provided by Logan via Discord.

        print_r($summary);
    }
}
