/*
                                                               
--.--                  ,---.                   |    o          
  |,---.,---.,---.,---.|__.,---.,---.,-.-.,---.|--- .,---.,---.
  ||    ,---||   |`---.|   |   ||    | | |,---||    ||   ||   |
  ``    `---^`   '`---'`   `---'`    ` ' '`---^`---'``---'`   '
                                                               
                                                               
    |     |         o|                                         
,---|,---.|--- ,---..|    ,---.                                
|   ||---'|    ,---|||    `---.                                
`---'`---'`---'`---^``---'`---'                                
                                                               
*/


var stuartPot= [
    // This is 2D. He should not be edited.
    {phase: 1, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHp746RmKQQq3IBeTFrdgnySYrvi8Ezin7SAP20LH5UCR7oElIjwcFBzR8VzAdY16Ehqs&usqp=CAU", eyes: "black"},
    {phase: 2, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBP5DGgbhHgwSZR0DdsLzJn1yPNT1us_TIaQ&usqp=CAU", eyes: "black and red"},
    {phase: 3, img: "https://pm1.aminoapps.com/6570/c8daf5064bf60089cf758fda53df8571aa49c3c1_hq.jpg", eyes: "white"},
    {phase: 4, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHoHq_9nyds5izcqYCqbaA9-hMwtsGwTWQTg&usqp=CAU", eyes: "black"},
    {phase: 5, img: "https://i.pinimg.com/originals/23/f6/ba/23f6ba69c49bd3310525e07271285f79.jpg", eyes: "white"},
    {phase: 6, img: "https://i.redd.it/hulz7sfo9gv61.jpg", eyes: "white"},
    {phase: 7, img: "https://cdn.nexusstudios.com/uploads/2022/08/Gorillaz-1.jpg", eyes: "white"},
]


// Modifiers: "2D, but..."
var positiveModifier=["happy", "excited", "softer"]
var negativeModifier=["visibly tired", "looking possessed"]
var neutralModifier=["older", "more tired"]
var scaryModifier=["with bloody eyes", "with a visibly injured face", "slightly zombified", "looking possessed", "visibly scarred"]
var spicyModifier=[`with a large arse`, `with a round arse`, "thicc", "dummy thicc", "as a himbo", "as a femboy", "horny", "bubbly", "way more ditzy", "kind of, like, a bimbo", "mildly feminised"]

var spicyP2Modifier=["studly", "kind of buff", "taller", "tougher", "bulky"] // When a friend is TF'd in NSFW scenarios


// Good adverbs. Happy uses these. These need to be happy.
var posAdv=[ "easily", "smoothly","instantly", "instantly",]
// Bad adverbs. Sad & Scary use these. These need to be upsetting.
var negAdv=["painfully", "harshly", "achingly","very slowly", "slowly", "violently", "struggle for 3 days as you"]
// Neutral adverbs. Only the neutral scenarios use these. These need to be awkward.
var neuAdv=["awkwardly", "noisily", "unevenly","slowly but surely", "near-instantly",]
// NSFW adverbs.
var spicyAdv=["blissfully", "rapidly", "very rapidly","instantaneously", "blissfully"]

// Make scenarios here!
// Example: "Your friends attempt a spell, but don't realise the ramifications. Before their eyes,"
var positiveScenarios=[
    [{story:"", perm: false, group: false, se: []},], // Phase 1
    [{story:"", perm: false, group: false, se: []},], // Phase 2
    [{story:"", perm: false, group: false, se: []},], // Phase 3
    [{story:"", perm: false, group: false, se: []},], // Phase 4
    [{story:"", perm: false, group: false, se: []},], // Phase 5
    [{story:"", perm: false, group: false, se: []},], // Phase 6
    [{story:"", perm: false, group: false, se: []},], // Phase 7
]
var negativeScenarios=[
    [{story:"", perm: false, group: false, se: []},], // Phase 1
    [{story:"", perm: false, group: false, se: []},], // Phase 2
    [{story:"", perm: false, group: false, se: []},], // Phase 3
    [{story:"", perm: false, group: false, se: []},], // Phase 4
    [{story:"", perm: false, group: false, se: []},], // Phase 5
    [{story:"", perm: false, group: false, se: []},], // Phase 6
    [{story:"", perm: false, group: false, se: []},], // Phase 7
]
var neutralScenarios=[
    [{story:"", perm: false, group: false, se: []},], // Phase 1
    [{story:"", perm: false, group: false, se: []},], // Phase 2
    [{story:"", perm: false, group: false, se: []},], // Phase 3
    [{story:"", perm: false, group: false, se: []},], // Phase 4
    [{story:"", perm: false, group: false, se: []},], // Phase 5
    [{story:"", perm: false, group: false, se: []},], // Phase 6
    [{story:"", perm: false, group: false, se: []},], // Phase 7
]
var scaryScenarios=[
    [{story:"", perm: false, group: false, se: []},], // Phase 1
    [{story:"At some point during the making of Demon Days, 2D went missing. No one knew if he was alive or not, and speculation was surrounding the band. <p>To mititgate this, Murdoc has opted to perform a ritual to \"bring 2D back\". He drops a few tufts of hair and some strange herbs into his hole to hell, reciting an ancient summoning ritual.</p>Meanwhile, you happened to be travelling nearby, and the demon has decided to use the nearest person to host 2D's essence. That means you. A bolt of lightning strikes you, making TFSEQUENCE", perm: true, group: false, se :["You occasionally lose control and black out. When you come to, you're usually somewhere else in Kong Studios and some time has passed."]},], // Phase 2
    [{story:"You awaken in a room in Plastic Beach, and you don't remember how you got there. Suddenly, Murdoc enters with a syringe in hand. You want to protest, but he jabs your arm with the syringe and injects the liquid into your muscle. The liquid almost instantly kicks in, and TFSEQUENCE <p>\"There, now you'll be a perfect backup singer.\"</p>", perm: true, group: false, se: ["The injection makes you vomit mid-transformation."]},], // Phase 3
    [{story:"", perm: false, group: false, se: []},], // Phase 4
    [{story:"", perm: false, group: false, se: []},], // Phase 5
    [{story:"", perm: false, group: false, se: []},], // Phase 6
    [{story:"", perm: false, group: false, se: []},], // Phase 7
]
var spicyScenarios=[
    [{story:"At a concert, a fan recognises your cosplay. RandPro1 loves it, and asks if you'd show off at the party after the concert. You agree, and follow RandPro3 to the venue. When the fan offers you a drink, RandPro2 watches in glee as TFSEQUENCE", perm: false, group: false, se:["Any subsequent drinks afterward sexualise you further."]},], // Phase 1

    [{story:"Out in the wilderness of rural Essex lies the original Kong Studios. You and your buddies Friend4, Friend3 and Friend2 decided you could easily loot the place for valuable objects. <br>While in the basement, 2D's original bedroom, you find a strange stick of incense and burn it. Instead of bringing good vibes, its magical properties change you into the original tennant of the room! As the incense gets you high, TFSEQUENCE", perm: false, group: true, se:["You stay high and titulated for the duration of your transformation."]},], // Phase 2

    [{story:"Your friends tease you about your 2D cosplay. They say it's really revealing. You try to argue, but then one of them snaps a picture to show you. However, when the flash goes off, TFSEQUENCE", perm: true, group: true, se:["Each snapped picture only enhances the sexualising effect."]},], // Phase 3

    [{story:"After buying the Spirit House with your friends Friend2, Friend3 and Friend4, you find that everyone feels weird. The second you mention it, TFSEQUENCE", perm: false, group: true, se: ["You gain a fruity lisp."]},], // Phase 4

    [{story:"You and your friend Friend1 go to a concert. He sunk an exorbitant amount of money on some VIP tickets, but it turns out that those tickets were a scam. <br>Just then, a witch comes by and offers to give you two a \"reality altering spell\" to get you backstage. Friend1 agrees, and she snaps her fingers. You both are engulfed in smoke! First, Friend1 is turned into a FriendMod version of Ace. Then, TFSEQUENCE", perm: true, group:true, se:["After the show, you end up being \"passed around\" (consensually).", "You learn that the way you both now look is based on this witchy lady's headcanons.", "It turns out that the witch ships 2D and Ace."]},], // Phase 5

    [{story:"You suddenly awaken in Kong Studios (West London) after playing a \"cursed videogame cabinet\". After just a few moments in this new world, TFSEQUENCE", perm: false, group: false, se: ["You have a tendency to salivate more often."]},], // Phase 6

    [{story:"The TV you just found emenates a hynpotic static noise. Upon closer inspection, it appears to be showing a bunch of pink static with a picture of an ancient demon, Pazuzu. Right as you touch it, a surge of the static consumes you, and TFSEQUENCE", perm: false, group: false, se: ["There's a permanent coating of eyeshadow on your eyes. It's hot pink."]},], // Phase 7
]
var tfLocations=[
    [], // Phase 1
    [], // Phase 2
    [], // Phase 3
    [], // Phase 4
    [], // Phase 5
    [], // Phase 6
    [], // Phase 7
]

var happySE=[ // Happy Side Effects
    "You save a few bucks on hair dye, since your hair is now blue."
]
var sadSE=[ // Sad Side Effects
    "The transformation immediately sends you into a fit of dissociation."
]
var neuSE=[ // Neutral Side Effects
    "The transformation made you feel dizzy."
]
var scarySE=[ // Scary Side Effects
    "You have a haunting look to you now."
]
var spicySE=[ // Sexy Side Effects
    "Your arse becomes the focal point of your appeal.",
    "People love to tease you.",
    "Your outfits keep changing after you put them on-- As in, they become skimpy.",
    "The briefs you're wearing suddenly disappear, leaving you commando."
]

var permSE=[ // Side effects of the TF being permanent.
    "You slowly forget what was happening before the transformation.",
    "You gain a British accent.",
    "You first resist the transformation, but ultimately succumb to the effects."
]
var revertSE=[ // Side effects of turning back
    "The British accent stays even after you change back.",
    "Upon turning back, you realise your eyes are still solid EYECOLOURHERE!"
]

/* 

 |  ____|| |                                  |__   __|         | |  
 | |__   | |  __ _ __   __ ___   _   _  _ __     | |  ___ __  __| |_ 
 |  __|  | | / _` |\ \ / // _ \ | | | || '__|    | | / _ \\ \/ /| __|
 | |     | || (_| | \ V /| (_) || |_| || |       | ||  __/ >  < | |_ 
 |_|     |_| \__,_|  \_/  \___/  \__,_||_|       |_| \___|/_/\_\ \__|
                                                                     
                                                                     
*/


var aNames=[ // Names that start with A. Replaces "Ace" in isekai/group TF. Friend1
    "Aaron",
    "Anthony",
    "Adrian",
    "Albert",
    "Adonis",
    "Aiden",
    "Andrew",
    "Alan",
    "Austin"
]
var nNames=[ // Names that start with N. Replaces "Noodle" in isekai/group TF. Friend2
    "Naomi",
    "Nanami",
    "Natsuki",
    "Nanaka",
    "Natsumi",
    "Nayu",
    "Namika"
]
var rNames=[ // Names that start with R. Replaces "Russel" in isekai/group TF. Friend3
   "Ryan",
   "Rowan",
   "Ray",
   "Rex",
   "Ramsey",
   "Robin",
   "Roman"
]
var mNames=[ // Names that start with M. Replaces "Murdoc" in isekai/group TF. Friend4
    "Mark",
    "Marshall",
    "Michael",
    "Matthew",
    "Mateo",
    "Mason",
    "Maverick",
    "Marc",
    "Malik"
]