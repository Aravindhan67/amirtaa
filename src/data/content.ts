export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  tag: string;
  year: string;
  image: string;
  aspect?: 'portrait' | 'landscape' | 'square';
  note?: string;
}

export interface TimelineYear {
  yearNumber: number;
  yearLabel: string;
  title: string;
  tagline: string;
  story: string;
  highlight: string;
  badge: string;
}

export interface AppreciationItem {
  number: string;
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
  detail: string;
  tag: string;
}

export interface DayCategory {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  quote: string;
  description: string;
  color: string;
}

export const BIRTHDAY_DATA = {
  friend: {
    name: "Amirtaa",
    nickname: "Ami",
    yearsOfFriendship: 5,
    milestone: "Half a Decade of Unbreakable Bond",
    birthdayWish: "Happy Birthday, Amirtaa ❤️",
    role: "Best Friend & Confidante",
  },

  intro: {
    quotePart1: "Some people enter your life...",
    quotePart2: "Some people become a part of it.",
    stats: [
      { label: "YEARS", value: "5", suffix: "+" },
      { label: "COUNTLESS", value: "MEMORIES", suffix: "✨" },
      { label: "ONE AMAZING", value: "FRIEND", suffix: "❤️" }
    ],
    ctaText: "Enter the story",
    scrollHint: "Scroll to explore our journey"
  },

  story: {
    heading: "Five Years of Us",
    subheading: "A Chronicle of Half a Decade",
    leadText: "Five years ago, I got a friend. I didn't know then that this friendship would become one of the most valuable parts of my life.",
    timeline: [
      {
        yearNumber: 1,
        yearLabel: "Year 1",
        title: "The Beginning",
        tagline: "Two strangers figuring out they share the same wavelength",
        story: "It started with awkward small talk, shared laughs, and casual banter. We didn't know yet that a lifelong confidante was right in front of us, but something just clicked effortlessly.",
        highlight: "The first inside jokes that no one else understood.",
        badge: "Genesis"
      },
      {
        yearNumber: 2,
        yearLabel: "Year 2",
        title: "Getting Closer",
        tagline: "From occasional chats to daily survival debriefs",
        story: "Conversations turned deeper. Late-night rants, solving each other's overthinking, and realizing we could be completely unhinged without fear of judgment.",
        highlight: "Realizing we could talk about everything without holding back.",
        badge: "Trust"
      },
      {
        yearNumber: 3,
        yearLabel: "Year 3",
        title: "More Memories",
        tagline: "Unplanned trips, belly-aching laughter, and chaotic stories",
        story: "We collected an endless library of moments. Spontaneous plans that went completely off the rails, random tea sessions, and moments so funny tears were shed.",
        highlight: "Stories we still bring up and laugh about until our stomachs hurt.",
        badge: "Chaos & Joy"
      },
      {
        yearNumber: 4,
        yearLabel: "Year 4",
        title: "Through Everything",
        tagline: "When life got heavy, having someone in your corner",
        story: "Not every season was easy. When challenges hit, difficult decisions loomed, or days felt exhausting, you were the calm anchor. You showed up, listened, and never wavered.",
        highlight: "A solid anchor through the storms.",
        badge: "Resilience"
      },
      {
        yearNumber: 5,
        yearLabel: "Year 5",
        title: "Still Here",
        tagline: "Five years down, effortlessly constant",
        story: "Half a decade later, nothing has faded. Even when life gets busy, our rhythm never skips a beat. You remain one of the purest, most dependable friendships I could ever ask for.",
        highlight: "A bond tested by time, stronger than ever.",
        badge: "Unbreakable"
      }
    ] as TimelineYear[]
  },

  upsAndDowns: {
    heading: "Through the Ups & Downs",
    primaryQuote: "You weren't only there for the good days.",
    secondaryQuote: "You were there for the difficult ones too.",
    conclusion: "Through my ups and downs, you've always been someone I could count on.",
    categories: [
      {
        id: "good-days",
        title: "GOOD DAYS",
        subtitle: "Wins & Celebrations",
        emoji: "🎉",
        quote: "Double the celebration because you were cheering the loudest.",
        description: "From celebrating personal milestones, scoring small wins, to pure golden hour happiness — you turned good moments into unforgettable memories.",
        color: "from-amber-500/20 to-rose-500/20"
      },
      {
        id: "bad-days",
        title: "BAD DAYS",
        subtitle: "Silence & Support",
        emoji: "🌧️",
        quote: "Never judging, never lecturing — just holding space.",
        description: "When things went wrong or the weight of the world felt too heavy, you never minimized my feelings. You listened, grounded me, and reminded me who I am.",
        color: "from-blue-600/20 to-indigo-900/20"
      },
      {
        id: "random-days",
        title: "RANDOM DAYS",
        subtitle: "3 AM Conversations",
        emoji: "☕",
        quote: "The completely pointless conversations that somehow matter the most.",
        description: "Unfiltered rants at odd hours, sending 40 reels in a row, dissecting random philosophical questions, and laughing at things nobody else finds amusing.",
        color: "from-emerald-500/20 to-teal-800/20"
      },
      {
        id: "crazy-days",
        title: "CRAZY DAYS",
        subtitle: "Total Chaos",
        emoji: "⚡",
        quote: "Adventures that started with 'What could possibly go wrong?'",
        description: "Impulsive plans, chaotic decisions, uncontrollable laughing fits in places where we were supposed to stay quiet, and pure unadulterated energy.",
        color: "from-purple-500/20 to-pink-600/20"
      },
      {
        id: "everything-in-between",
        title: "EVERYTHING IN BETWEEN",
        subtitle: "The Everyday Magic",
        emoji: "✨",
        quote: "The quiet reassurance of knowing you have someone solid in your corner.",
        description: "The mundane ordinary days that are quietly held together because of a steady friend. No drama, no performances, just pure genuine companionship.",
        color: "from-rose-500/20 to-amber-500/20"
      }
    ] as DayCategory[]
  },

  memories: [
    {
      id: "mem-1",
      title: "The Iconic Smile",
      caption: "Another random memory 😂",
      tag: "Vibes",
      year: "Year 1",
      image: "/photos/amirtaa-01.jpeg",
      aspect: "portrait",
      note: "The signature Amirtaa expression that can light up any bad day."
    },
    {
      id: "mem-2",
      title: "The Unhinged Plan",
      caption: "Why were we like this?",
      tag: "Chaos",
      year: "Year 2",
      image: "/photos/amirtaa-02.jpeg",
      aspect: "portrait",
      note: "Started with 'let us quickly do this for 10 minutes' and took 6 entire hours."
    },
    {
      id: "mem-3",
      title: "Definitely One For The Books",
      caption: "Definitely one for the memories.",
      tag: "Unforgettable",
      year: "Year 2",
      image: "/photos/amirtaa-03.jpeg",
      aspect: "portrait",
      note: "One of those moments that will always make us burst into laughter whenever brought up."
    },
    {
      id: "mem-4",
      title: "Five Years of Nonsense",
      caption: "Five years of nonsense.",
      tag: "Forever",
      year: "Year 3",
      image: "/photos/amirtaa-04.jpeg",
      aspect: "portrait",
      note: "Looking back at our photos and wondering how we survived ourselves."
    },
    {
      id: "mem-5",
      title: "Late Night Debriefs",
      caption: "Fixing each other's problems since day one.",
      tag: "Support",
      year: "Year 3",
      image: "/photos/amirtaa-05.jpeg",
      aspect: "portrait",
      note: "No judgment, just straight truth and a whole lot of reassurance."
    },
    {
      id: "mem-6",
      title: "Unstoppable Duos",
      caption: "Who let us out in public?",
      tag: "Unfiltered",
      year: "Year 3",
      image: "/photos/amirtaa-06.jpeg",
      aspect: "portrait",
      note: "Every time we hang out, someone inevitably asks if we ever calm down."
    },
    {
      id: "mem-7",
      title: "Golden Hour Glow",
      caption: "Living rent-free in the memory bank.",
      tag: "Golden",
      year: "Year 4",
      image: "/photos/amirtaa-07.jpeg",
      aspect: "portrait",
      note: "Proof that good lighting and good company make the best moments."
    },
    {
      id: "mem-8",
      title: "The Look Of Pure Mischief",
      caption: "Trouble was definitely about to happen.",
      tag: "Chaos",
      year: "Year 4",
      image: "/photos/amirtaa-08.jpeg",
      aspect: "portrait",
      note: "You know when she makes this face, whatever idea she has is 100% chaotic."
    },
    {
      id: "mem-9",
      title: "Quiet Reassurance",
      caption: "The friend who always has your back.",
      tag: "Loyalty",
      year: "Year 4",
      image: "/photos/amirtaa-09.jpeg",
      aspect: "portrait",
      note: "Through tough times and easy ones, never having to doubt where we stand."
    },
    {
      id: "mem-10",
      title: "Effortlessly Cool",
      caption: "Too much swag for one frame.",
      tag: "Style",
      year: "Year 5",
      image: "/photos/amirtaa-10.jpeg",
      aspect: "portrait",
      note: "Classic Amirtaa — effortlessly stealing the spotlight without even trying."
    },
    {
      id: "mem-11",
      title: "Laughter in Overdrive",
      caption: "Laughing until our stomachs hurt.",
      tag: "Joy",
      year: "Year 5",
      image: "/photos/amirtaa-11.jpeg",
      aspect: "portrait",
      note: "One of those jokes that wasn't even that funny, but we couldn't breathe."
    },
    {
      id: "mem-12",
      title: "The Calm Anchor",
      caption: "The voice of reason (most of the time 😂).",
      tag: "Wisdom",
      year: "Year 5",
      image: "/photos/amirtaa-12.jpeg",
      aspect: "portrait",
      note: "The person who talks sense into me when my overthinking goes into overdrive."
    },
    {
      id: "mem-13",
      title: "Spontaneous Adventures",
      caption: "Best decisions are always unplanned.",
      tag: "Adventure",
      year: "Year 3",
      image: "/photos/amirtaa-13.jpeg",
      aspect: "portrait",
      note: "Random plans turned into peak core memories."
    },
    {
      id: "mem-14",
      title: "Unconditional Bond",
      caption: "Five years down, effortlessly constant.",
      tag: "Timeless",
      year: "Year 4",
      image: "/photos/amirtaa-14.jpeg",
      aspect: "portrait",
      note: "Even if days pass without talking, picking right back up like no time passed."
    },
    {
      id: "mem-15",
      title: "Celebration Mode",
      caption: "Always ready to celebrate the wins.",
      tag: "Celebration",
      year: "Year 5",
      image: "/photos/amirtaa-15.jpeg",
      aspect: "portrait",
      note: "Cheering the loudest whenever something good happens."
    },
    {
      id: "mem-16",
      title: "Simply Amirtaa",
      caption: "Because normal would be so boring.",
      tag: "Unique",
      year: "Year 5",
      image: "/photos/amirtaa-16.jpeg",
      aspect: "portrait",
      note: "The authentic, unapologetic, wonderful human that she is."
    },
    {
      id: "mem-17",
      title: "Treasured Chapters",
      caption: "Half a decade of shared life.",
      tag: "Milestone",
      year: "Year 5",
      image: "/photos/amirtaa-17.jpeg",
      aspect: "portrait",
      note: "1,825+ days of knowing I have the best friend anyone could ever ask for."
    },
    {
      id: "mem-18",
      title: "Cheers to the Next Chapter",
      caption: "To many more years of memories and madness! ❤️",
      tag: "Forever",
      year: "Year 5",
      image: "/photos/amirtaa-18.jpeg",
      aspect: "portrait",
      note: "Happy Birthday, Amirtaa. Here's to everything that lies ahead!"
    }
  ] as MemoryItem[],

  appreciation: {
    heading: "5 Things I Appreciate About You",
    subtitle: "A few of the countless reasons why you're irreplaceable",
    items: [
      {
        number: "01",
        title: "Your Support",
        subtitle: "Always being there when it mattered.",
        emoji: "🤝",
        description: "You're the person who checks in when things go quiet, who notices the slight shift in energy, and who shows up without needing an invitation.",
        detail: "Having you on my team made navigating the toughest challenges ten times easier.",
        tag: "Loyalty"
      },
      {
        number: "02",
        title: "Your Patience",
        subtitle: "Especially when dealing with me.",
        emoji: "😭",
        description: "Let's be honest — putting up with my overthinking, my stubborn phases, and my spontaneous nonsense requires Olympic-level patience.",
        detail: "Yet you never flinch, never run out of grace, and always bring calm to the chaos.",
        tag: "Grace"
      },
      {
        number: "03",
        title: "Your Craziness",
        subtitle: "Because normal would be boring.",
        emoji: "😂",
        description: "Life with you is never dull. The sudden bursts of random laughter, the unhinged reactions, and the ridiculous banter keep life lively.",
        detail: "Normal friendships are fine, but our level of shared chaos is art.",
        tag: "Energy"
      },
      {
        number: "04",
        title: "Your Honesty",
        subtitle: "Always keeping things real.",
        emoji: "❤️",
        description: "You tell me what I need to hear, not just what I want to hear. In a world full of sugarcoating, your directness is rare gold.",
        detail: "I can always trust you to give me the genuine truth without malice.",
        tag: "Authenticity"
      },
      {
        number: "05",
        title: "Simply You",
        subtitle: "Because there is only one Amirtaa.",
        emoji: "✨",
        description: "Your kind heart, your contagious laugh, your resilient spirit, and the sheer positive warmth you bring into every room you step into.",
        detail: "Never change. The world needs exactly who you are.",
        tag: "Irreplaceable"
      }
    ] as AppreciationItem[]
  },

  letter: {
    heading: "A Note From The Heart",
    tagline: "Words that are long overdue",
    paragraphs: [
      "I don't say it often, but I'm genuinely grateful that life gave me a friend like you.",
      "Five years is a long time, and somehow we've collected enough memories to fill a whole website 😂",
      "Thank you for being there through the good days, the bad days, and everything in between.",
      "I hope this new year of your life gives you everything you deserve — happiness, success, peace and plenty of reasons to smile.",
      "Happy Birthday, Amirtaa ❤️",
      "Here's to the next chapter of our friendship."
    ],
    signoff: "Your Best Friend Always",
    date: "Celebrating Half a Decade & Counting"
  },

  surprise: {
    buttonPrompt: "One Last Thing…",
    title: "Happy Birthday, Amirtaa! 🎂❤️",
    tagline: "5 years down. Many more memories to go.",
    video: {
      url: "/birthday-video.mp4",
      title: "Amirtaa's Birthday Video 🎬",
      subtitle: "A special 5-year friendship memory reel",
      note: "Our treasured video moments celebrating half a decade of friendship."
    },
    wishes: [
      "May this year bring you unstoppable confidence.",
      "May all your quiet prayers and ambitions come true.",
      "May you always laugh until your stomach hurts.",
      "And may we never run out of stupid stories to laugh about."
    ],
    devJoke: "Made with ❤️, way too much caffeine & way too much code by your best friend."
  },

  easterEggs: {
    fiveClicksMessage: "🎉 Secret Unlocked: 5 clicks for 5 years! You really are the most patient and curious person ever. Here's a virtual lifetime pass to free iced coffees and late-night rants on demand!",
    secretButtonPrompt: "Do not click 👀",
    secretButtonReveal: "Of course you clicked it! That's peak Amirtaa behavior. Never change 😂",
    consoleMessage: `
%c ✨ HAPPY BIRTHDAY AMIRTAA! ✨ %c
---------------------------------------------
Dedicated to 5 years of top-tier friendship.
Built with React, Framer Motion & Love.
Easter Egg #3 found by the best inspector!
---------------------------------------------
    `
  }
};
