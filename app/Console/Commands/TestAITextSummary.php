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
            "# 02/08/2023 Unit One Review

## Chapter One

- ***DO NOT*** worry about inferential statistics, random sampling and meta analysis.
- 4 major research perspectives
    - Internal
        - Biological: Examines how our physiology affects our mind and behavior
        - Cognitive: Examines how our mental processes affect our mind and behavior
    - External
        - Behavioral: How events in our environment condition our behavior
        - Sociocultural: How our culture and other people impact our mind and body
- How we do research
    - Theories, hypothesis, operational definitions

        - Theory: Interrelated set of concepts used to explain a body of data and used to make predictions about the results of future experiments.
        - Hypothesis: A testable prediction about the relationship between one or more predictor variables and an outcome.
        - Operational Definition: A description of a property in concrete measurable terms
    - Research methods

        - Correlation (Direction and strength)
            - Direction: Positive correlation means the increase of one variable coincides with the increase of another. Negative correlation means the increase of one variable coincides with the decrease of another.
            - Strength: 0 = no correlation, up to .3 indicates weak correlation, .3 to .6 indicates moderate correlation, .6 to 1 indicates strong correlation.
        - Experiment (DV, IV, control group, random assignment, expectancy effect, ethics)
            - DV: The dependent variable is the variable that is affected by changes in the IV.
            - IV; The independent variable is the variable you are using to predict an outcome.
            - Control Group: The group used to compare against. They may be given a placebo control or receive no treatment at all.
            - Random Assignment: Randomly assign participants to the experimental group or control group.
            - Expectancy Effect: Participants act a certain way in order to 'please' the experimenter whethere it's intentional or not. Can be prevented with single-blind or double-blind studies.
            - Ethics: Participants must be informed about the research before participating and be able to leave the experiment at any time. Paricipants should not be exposed to risks greater than those found in everyday life. Participants must be informed of the purpose of the research in a debriefing. IRB (Institutional review board) review experiments before starting for ethics and appropriateness.
- How do we analyze research results
    - Central Tendency (mean, median, mode)
        - Mean: The average value
        - Median: The number such that an equal amount of data is on either side.
        - Mode: The most common value
    - Variability (Variance, standard deviation)
        - Variance: How much the data is spread out
        - Standard Deviation: How far data is from the mean on average
    - Distributions (normal, positively or negatively skewed)
        - Normal: Peak is centered around mean
        - Positive Skewed: There is an outlier above the median (mean pulled higher)
        - Negative skewed: There is an outlier below the median (mean pulled lower)

* * *

## Chapter 2

- ***DO NOT*** worry about different neurotransmitter names, peripheral nervous system, endocrine glandular system, consciousness and the sleeping brain.
- Neuron (Anatomy, types, communication(within and between))
    - Types:
        - Motor Neurons: Control movements
        - Sensory Neurons: Take care of sensing the environment
        - Inter neurons: Carry signals
    - Anatomy:
        - Dendrites: Receive inputs to the neuron which are processed by the cell body
        - Axon Terminals: Connects to the dendrites of the next neuron and uses neurotransmitters to communicate with it.
        - Axon: Carries a signal from one end of the neuron to the other via action potential (electrical)
        - Myelin Sheathe: Covers the axon and enables much faster transfer of info
- Brain (How we study the brain(Lesions, neuroimaging))
    - Lesions: We used to use damaged brains in people to figure out what the damaged parts did.
    - Neuroimaging: We use a variety of fancy ways to look at the brain. Some have better spatial resolution while others have better temporal resolution.
- Organization of the brain (fore/hind/mid, organization within hemisphere(Lobes: frontal, parietal, temporal, occipital), Organization between hemispheres(Lateralization, corpus callosum, split brain))
    - Forebrain: Highest level of the brain. Takes care of most high level cognition.
        - Cerebral Cortex: Outside of the forebrain
        - Basal Ganglia: Controls intentional movement
        - Hypothalamus: Pleasure and basic drives
        - Amygdala: Emotion, Behavior regulation, threat detection
        - Hippocampus: Formation of memories
    - Mid Brain: Connects the hindbrain and the forebrain. Orients us in our environment.
        - Tegmentum: Related to movement and arousal
        - Tectum: Orients us in the environment
    - Hind Brain: Coordinates info coming in and out of the spinal cord. Handles basic movement.
        - Cerebellum: Controls fine motor skills.
        - Brain Stem: Controls basic body function
            - Medulla: Coordinates heart rate, circulation, and respiration
                - Reticular formation is inside: Regulates sleep, wakefulness, and arousal
            - Pons: Relays info from cerebellum to the rest of the brain.
    - Lobes:
        - Sulci: Wrinkles in our brain
        - Central fissure: divides our brain horizontally
        - Lateral fissure: divides our brain vertically
        - Temporal Lobe: Takes care of most audio processing. Bottom of brain.
        - Occipital Lobe: Contains primary visual processing. Back of brain
        - Frontal Lobe: Higher order cognition happens here.
        - Parietal Lobe: Behind the central fissure and above the lateral fissure: Primary somatosensory area. Touch, temperature, body position, pain. Integrates sensory integration particularly determining spatial sense and navigation.
            - Contains primary motor area sort of. Its between the parietal lobe and frontal lobe and interacts with both.
        - Organization Between Hemispheres:
            - The corpus callosum bridges the brain hemispheres
            - Right part of brain focuses on details:
                - Visual processing is more prevalent of the right side of the brain.
                - Some visual info is sent contra-laterally and some is sent ipsilaterally.
            - Left part of brain focuses more on the larger picture
                - Language is predominantly a left brain activity
                    - Wernicke's area focuses on fluency. (The sentence sounds fluent)
                    - Broca's area focuses on the cohesiveness of a sentence. (The sentence has coherent information)
- Brain Plasticity: The ability of the brain to adapt to its environment.
    - Structural: Experience or memories change the brains physical structure.
    - Functional: Brains functions move from a damaged area to an undamaged area.

* * *

## Chapter 3

- ***DO NOT*** worry about signal detection theory, and scaling detection
- External stimulus to sensation (wavelength, frequency, amplitude, weber's law, absolute threshold, just noticeable difference, transduction)
- Auditory Processes (Outer, middle, and inner ear, nerve/conductive deafness, pitch perception theories)
- Visual Processes (cornea, pupil, iris, lens, retina, fovea, cones, rods, optic nerves, opponent process theory, trichromatic theory, dorsal/ventral stream)
- Visual Perception (Dorsal/ventral stream, feature detection, binding, organization(gestalt principle), motion and change, perception/blindness, top down/bottom up, context, perceptual set)
- Emotion (Dimension/physiology of emotions, theories of emotion, emotional brain and emotion regulation)",
        true); // Note provided by Logan via Discord.

        print_r($summary);
    }
}
