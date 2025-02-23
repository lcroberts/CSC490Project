import AppContext from "@/context/AppContext";

/**
 * Wraps anything that requires access to application state. Hanldes
 * fetching and inserting data into the context.
 */
export default function EditorStateProvider({ children }) {
  let val = {};

  val.notes = [
    {
      title: "Fishing spots in North Carolina",
      createdAt: "10:30",
      content: `Freshwater Fishing:

  - Lake Norman – The largest lake in North Carolina, located near Charlotte. It's great for bass, catfish, and crappie.
  - Jordan Lake – A great spot near Chapel Hill with bass, catfish, and bluegill. It’s known for good bass fishing year-round.
  - Fontana Lake – Located in the Smoky Mountains, this lake offers trophy-sized trout and bass.
  - High Rock Lake – Near Salisbury, this lake is well-known for bass and crappie fishing.
  - Mayo River – A peaceful spot near the Virginia border, popular for trout and smallmouth bass.

Saltwater Fishing:

  - Outer Banks – Famous for surf fishing, you can find species like striped bass, red drum, and flounder.
  - Cape Lookout – A prime spot for catching tarpon, red drum, and various types of sharks.
  - Morehead City – Known for its deep-sea fishing, especially for king mackerel, tuna, and sailfish.
  - Wilmington – This area offers both inshore and offshore fishing, including species like flounder, redfish, and speckled trout.
  - Hatteras Island – A haven for anglers seeking big game fish such as blue marlin, sailfish, and tuna.`,
    },
    {
      title: "Grades",
      createdAt: "02/16/2025",
      content: `Overall, I'm doing pretty well in most of my classes, but there are a few areas I need to focus on. In Math, I have a B+, which is solid, but I really want to push for an A by the end of the semester. I’ve been doing okay in English with an A-, but I think I could do better on my essays if I put in more effort. My History grade is a C, which I’m not happy with, so I plan to meet with the teacher for extra help and work on my study habits. Science is going well with a B, but I know I can raise it if I focus more during labs and quizzes. Overall, I just need to keep on top of my assignments and review more before tests. I’m determined to finish strong!`,
    },
    {
      title: "Ideas for songs",
      createdAt: "10/12/2024",
      content: `Song Ideas:

1. "Whispers of the Ocean" – A song about finding peace and reflection while listening to the sounds of the ocean.
2. "Underneath the Stars" – A song about longing and self-discovery while stargazing on a quiet night.
3. "The Weight of Time" – A track that contemplates how quickly time passes and how it shapes our lives.
4. "Echoes in the Silence" – A song reflecting on the moments when we feel the absence of someone, yet their influence lingers.
5. "Fading Footprints" – A song about the impermanence of life, where we leave our marks but they eventually fade.
6. "Through the Storm" – A song of resilience, about enduring hardships and coming out stronger on the other side.
7. "The Road Less Traveled" – A reflective song about choosing your own path in life, despite uncertainty and challenges.
8. "Tides of Change" – A song about embracing change and growth, comparing it to the ever-shifting tides of the sea.
9. "In the Shadow of the Mountain" – A contemplative song about overcoming obstacles that seem larger than life, yet finding strength within.
10. "The Quiet Between Us" – A song about the complex emotions and unsaid words between two people in a relationship.
`,
    },
    {
      title: "Apple Pie Recipe",
      createdAt: "10/10/2024",
      content: `# Classic Apple Pie Recipe

## Ingredients:

- For the crust:
    - 2 1/2 cups all-purpose flour
    - 1 teaspoon salt
    - 1 tablespoon granulated sugar
    - 1 cup (2 sticks) unsalted butter, cold and cubed
    - 6-8 tablespoons ice water
- For the filling:
    - 6 cups peeled, cored, and sliced apples (about 6-7 medium apples, such as Granny Smith or Honeycrisp)
    - 3/4 cup granulated sugar
    - 1/4 cup light brown sugar, packed
    - 2 tablespoons all-purpose flour
    - 1 tablespoon cornstarch
    - 1 1/2 teaspoons ground cinnamon
    - 1/4 teaspoon ground nutmeg
    - 1/2 teaspoon lemon juice
    - Pinch of salt
- For the topping:
    - 1 tablespoon unsalted butter, cut into small pieces
    - 1 tablespoon milk (for brushing the crust)
    - 1 tablespoon coarse sugar (optional, for sprinkling)

## Instructions:

- Make the crust:
    - In a large bowl, combine the flour, salt, and sugar.
    - Add the cold, cubed butter to the flour mixture and use a pastry cutter or your fingers to cut the butter into the flour until it resembles coarse crumbs with pea-sized bits of butter.
    - Gradually add the ice water, 1 tablespoon at a time, stirring with a fork until the dough just begins to come together.
    - Turn the dough out onto a clean surface, divide it in half, and form each half into a disk. Wrap the dough in plastic wrap and refrigerate for at least 1 hour.
- Prepare the filling:
    - In a large bowl, toss the apple slices with the sugars, flour, cornstarch, cinnamon, nutmeg, lemon juice, and salt. Make sure the apples are well-coated with the mixture.
- Assemble the pie:
    - Preheat the oven to 425°F (220°C).
    - Roll out one disk of dough on a lightly floured surface into a 12-inch circle. Carefully fit it into a 9-inch pie pan.
    - Pour the apple filling into the pie crust, spreading the apples evenly.
    - Dot the filling with the butter pieces.
    - Roll out the second disk of dough and place it over the apples. Trim any excess dough and crimp the edges together to seal.
    - Cut a few slits in the top crust to allow steam to escape.
- Bake the pie:
    - Brush the top crust with the milk and sprinkle with coarse sugar if desired.
    - Place the pie on a baking sheet (to catch any drips) and bake for 45-50 minutes, or until the crust is golden brown and the filling is bubbly. You can cover the edges of the crust with foil during the last 20 minutes of baking to prevent over-browning.
- Cool and serve:
    - Let the pie cool for at least 2 hours before serving so the filling can set. Serve with vanilla ice cream or whipped cream if desired!`,
    },
  ];

  val.activeNote = null;

  return (
    <AppContext.Provider value={val}>
      {children}
    </AppContext.Provider>
  )
}
