// One entry per background image, in strict numeric order.
// `open` marks the slide inside a nav group that owns that group's anchor id.
// `blocks` are short (<=4 line) text chunks revealed one at a time — never
// more than one on screen together. Stretched scenes (see BLOCK_VH) get a
// `heightVh` taller than 100 so there is real scroll room to cycle through
// them while the background image stays pinned; everything else is a plain
// 100vh scene where the blocks auto-cycle on a timer once scrolled into view.
export const BLOCK_VH = 24

export const scenes = [
  {
    img: '/img/1.png',
    group: 'hero',
    open: true,
    blocks: [
      { kicker: 'SNCL', title: 'somewhere outside' },
      { body: ['No maps. No deadlines. Just the next bend in the road.'] },
    ],
  },
  { img: '/img/2.png', group: 'hero', water: true },
  { img: '/img/3.png', group: 'hero', water: true },

  {
    img: '/img/4.png',
    group: 'lore',
    open: true,
    stretch: true,
    blocks: [
      {
        kicker: 'Lore',
        body: ['The world was always in a hurry. Everyone had somewhere to be, something to become, something more to get.'],
      },
      {
        body: [
          'Faster roads. Bigger houses. More things. More plans. Everyone seemed so worried about getting somewhere that nobody had much time to look around.',
        ],
      },
      { body: ['snufchill never really understood the rush.'] },
      {
        body: [
          "So one day, he packed a small bag and left. There was no grand reason for it. Nothing terrible had happened. He wasn't running away from anything. He just wanted to see what was out there.",
        ],
      },
      {
        body: [
          'At first, people kept asking where he was going. He never had a very good answer. North, maybe. Somewhere warmer. Wherever the road looked interesting. Eventually, he stopped trying to answer.',
        ],
      },
    ],
  },
  {
    img: '/img/5.png',
    group: 'lore',
    stretch: true,
    blocks: [
      {
        body: [
          'He walked through forests and slept beside lakes. He followed roads without knowing where they ended. Sometimes he stayed somewhere for a night. Sometimes for weeks.',
        ],
      },
      { body: ['He met people along the way. Some walked with him for a while. Some stayed behind.'] },
      { body: ["He learned that you don't need very much when you carry everything yourself."] },
      {
        body: [
          "He learned that getting lost isn't much of a problem when you aren't trying to get anywhere. And he learned that some of the best days are the ones where nothing important happens.",
        ],
      },
      {
        body: ['A warm fire. A good view. Something to eat. A cool rock he found beside the road. That was usually enough.'],
      },
    ],
  },
  {
    img: '/img/6.png',
    group: 'lore',
    water: true,
    stretch: true,
    blocks: [
      { body: ["The world kept rushing. snufchill didn't."] },
      {
        body: [
          "There was always another deadline. Another thing everyone suddenly needed. Another reason why everything had to happen right now. Occasionally someone would tell him he was falling behind. He would look around. Behind what? Then he'd keep walking.",
        ],
      },
      {
        body: [
          "Nobody really knows where snufchill is now. Sometimes he's near the sea. Sometimes somewhere in the mountains. Sometimes he disappears for a while. That's normal. He'll probably turn up somewhere eventually.",
        ],
      },
      {
        body: [
          "And if you ask where he's going next, he probably still won't have an answer. Because somewhere along the way, he realized something.",
        ],
      },
      { body: ['There was never a destination. There didn’t need to be one. The world can wait.'] },
      { body: ["For now, he's somewhere outside."] },
    ],
  },

  {
    img: '/img/7.png',
    group: 'no-roadmap',
    open: true,
    blocks: [
      { kicker: 'No Roadmap', title: 'there was never a destination' },
      { body: ["There didn't need to be one. The world can wait."] },
    ],
  },
  { img: '/img/8.png', group: 'no-roadmap', fire: { left: 30, bottom: 10 } },
  { img: '/img/9.png', group: 'no-roadmap', fire: { left: 60, bottom: 10 } },

  {
    img: '/img/10.png',
    group: 'journal',
    open: true,
    blocks: [
      { kicker: 'Journal', body: ['Not a whitepaper. A notebook.'] },
      { body: ['Weather, distance, small victories, the occasional wrong turn.'] },
    ],
  },
  { img: '/img/11.png', group: 'journal' },
  { img: '/img/12.png', group: 'journal' },
  { img: '/img/13.png', group: 'journal' },

  {
    img: '/img/14.png',
    group: 'token',
    open: true,
    kicker: 'Token',
    title: '$SNCL',
    body: 'No chart to babysit — just a way for fellow travelers to carry a piece of the trip with them.',
    tokenCA: '0x1f600a9de857cf5979b2e11323f18690ab3b7300',
    dexscreenerUrl:
      'https://dexscreener.com/robinhood/0xe95595e4d1fe7f65902f9f68b21cb1ae7f66e5972c393644c8fcd61b90829b8f',
  },
  { img: '/img/15.png', group: 'token' },
].map((s) => ({ ...s, heightVh: s.stretch ? s.blocks.length * BLOCK_VH : 100 }))

export const navGroups = [
  { id: 'hero', label: 'Hero' },
  { id: 'lore', label: 'Lore' },
  { id: 'no-roadmap', label: 'No Roadmap' },
  { id: 'journal', label: 'Journal' },
  { id: 'token', label: 'Token' },
]

export const socialLinks = [
  { id: 'x', label: 'X', href: 'https://x.com/snufchill' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@snufchill' },
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/snufchill' },
]
