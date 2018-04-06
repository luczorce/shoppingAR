export default [
  {
    id: 11,
    name: "Test Location",
    description: "Here is a test location for development purposes. We may just leave this in here as an easter egg for all dem people to find.",
    checkedin: null,
    secret: true
  },
  {
    id: 184,
    name: "Kafe",
    description: "Welcome to the Kitchen Cafe, where denizens can fight over which coffee maker brews the best cuppa. Or which hot water maker makes the hotest water. Enjoy a greek yogurt from our fridge and gather around the water cooler.",
    checkedin: null,
    secret: false
  },
  {
    id: 441,
    name: "K'Bar",
    description: "This is the Kitchen Bar, where we can find the finest bubblies in the River West Hemisphere. Pampelmousse is the king around here, but shares the land with Lime, Diet Coke, and Ginger Ale. For the milk drinkers, you can have simple caffiene in the form of cold tea or the sugar burst from an athletic drink, and jog back to your cubicle.",
    checkedin: null,
    secret: false
  },
  {
    id: 430,
    name: "Recycle Bin",
    description: "Put your clean papers, rigid plastics, and metal here! Even though this may be a false promise of progress, one day we may actually recycle these materials. Keep up the conditioning!",
    optional: [
      {
        condition: [{id: 184, checkedin: true}, {id: 441, checkedin: true}],
        description: "Responsibly recycle your coffee stirrers, aluminum cans, and any plastics (cleaned in the sink) here!"
      }
    ],
    checkedin: null,
    secret: false
  },
  {
    id: 829,
    name: "Trash",
    description: "They say that there used to be composting here, but not anymore. Please toss your garbage here, leave your world cleaner than how you came to it.",
    optional: [
      {
        condition: [{id: 430, checkedin: false}],
        description: "Please sift through your trash, and recycle what can be re-used."
      }
    ],
    checkedin: null,
    secret: false
  },
  {
    id: 63,
    name: "Can Crusher",
    description: "Wanna give the denizens a good fright? Load up this can crusher for a smashing good time. The loud sizzle of a fizzle drank roaring in the ears of the denizens in this office is nothing to the satisfying crunch and similar heruclean muscle necessary to use this contraption.",
    optional: [
      {
        condition: [{id: 441, checkedin: true}],
        description: "Prove your loyalty to the All Mighty La Croix by making sure this recepticle is overflowing with the crushed carcasses of the fizzle swizzle you gotta guzzle down"
      }
    ],
    checkedin: null,
    secret: true
  },
  {
    id: 293,
    name: "Lounge",
    description: "This place may have been the center of life in this landscape at one point, but changing times and changing teams have left the populace concerned with the safety of the Lounge. \nRest assured, no sales teams will disurb you here, and there are stumps for your drinks and personal desktops. Great for disurbing the peace for the teams that sit in the area.",
    optional: [
      {
        condition: [{id: 184, checkedin: false}, {id: 441, checkedin: false}],
        description: "Go find the Kafe or the K'Bar for a drink and snack, and mozy on back here for a relaxing chat."
      }
    ],
    checkedin: null,
    secret: false
  },
  {
    id: 967,
    name: "General Goods Store",
    description: "Find the finest of papers here, plus a surplus of writing utensils.",
    optional: [
      {
        condition: [{id: 680, checkedin: false}],
        description: "Grab a whif of a sharpie for some good times."
      }
    ],
    checkedin: null,
    secret: false
  },
  {
    id: 273,
    name: "Post Office",
    description: "Wow, it's like a Mail Room that used to have a lot of use, but now people just get shit shipped here that they're too lazy to go to stores for. Nothing like excessive carbon emissions so I can try on 5 pairs of shoes from the comfort of my drouping couch.",
    checkedin: null,
    secret: false
  },
  {
    id: 535,
    name: "Water Fountain",
    description: "Here, a relic of the past, we have water in cans now, kthkxbai",
    checkedin: null,
    secret: true
  },
  {
    id: 71,
    name: "Toilet",
    description: "You know what you gotta do in here...",
    optional: [
      {
        condition: [{id: 535, checkedin: true}],
        description: "There's water in here too, but you shouldn't drink it"
      }
    ],
    checkedin: null,
    secret: false
  },
  {
    id: 680,
    name: "The Silver Sharpies",
    description: "A true sign of affluence, and supper effing cool. SILVER. SHARPIES.",
    checkedin: null,
    secret: true
  },
  {
    id: 895,
    name: "The Bay",
    description: "Area of Interest \n See where this experience started! Come find the prolific human who wanted to make this a reality, say Hi, and get sense for the conditions that drive this person a little barry[sic].",
    checkedin: null,
    secret: false
  },
  {
    id: 546,
    name: "Heater Switch",
    description: "Did you know this was a heater switch? Hopefully, now you do.",
    checkedin: null,
    secret: true
  },
];
