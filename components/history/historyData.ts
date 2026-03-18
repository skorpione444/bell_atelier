export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: string;
  image?: string;
}

export interface LegendFigure {
  name: string;
  nickname: string;
  years: string;
  bio: string;
  quote: string;
  image?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: "1000 BCE",
    title: "The First Herders",
    description:
      "Fulani pastoralists begin their migrations across the Sahel, driving cattle from the Senegal River basin eastward. They develop rope-work, mounted herding, and seasonal transhumance — skills that will one day define the cowboy.",
    era: "African Origins",
  },
  {
    year: "500 CE",
    title: "Nguni Cattle Reach Southern Africa",
    description:
      "The Nguni peoples — Zulu, Xhosa, Ndebele, Swazi — bring their multicoloured cattle south during the great migration. No two hides are alike. The Zulu will name 77 distinct color patterns to identify individual animals.",
    era: "African Origins",
  },
  {
    year: "1503",
    title: "African Cattle Cross the Atlantic",
    description:
      "DNA evidence from Puerto Real, Hispaniola, reveals cattle with genetics found only in Africa — over 100 years before historians believed African breeds reached the Americas. Herders and their cattle came as a package.",
    era: "The Crossing",
  },
  {
    year: "1600s",
    title: "Slavers Target the Herders",
    description:
      "Slave traders deliberately target Fulani and Senegambian cattle experts. 40% of enslaved people brought to the Lower South come from these herding regions. Their skills are too valuable to ignore.",
    era: "The Crossing",
  },
  {
    year: "1652",
    title: "Cape Horses Arrive in South Africa",
    description:
      "Dutch settlers import Arabian, Persian, and Barb horses to the Cape Colony. These bloodlines will produce the legendary Basotho Pony — a mount that gallops up mountains where other horses fear to walk.",
    era: "The Crossing",
  },
  {
    year: "1770",
    title: "Louisiana Cattle Codes",
    description:
      "Regulations require two enslaved workers per 100 head of cattle — formalizing what was already true: African cattlemen are running the ranches of the New World.",
    era: "The Crossing",
  },
  {
    year: "1825",
    title: "The Basotho Become Mounted",
    description:
      "King Moshoeshoe acquires his first horse. Within decades, practically the entire Basotho nation is mounted — earning them the title 'cowboys of the plains of South Africa.'",
    era: "African Horsemen",
  },
  {
    year: "1836",
    title: "Africa's First Boot Factory",
    description:
      "The Wupperthal Shoe Factory opens deep in the Cederberg Mountains of South Africa — the first factory of any kind on the continent. They craft veldskoen from vegetable-tanned leather using Khoisan techniques over 1,000 years old.",
    era: "African Horsemen",
  },
  {
    year: "1852",
    title: "Basotho Horsemen Defeat the British",
    description:
      "6,000 mounted Basotho warriors, almost all in European-style saddles, defend their homeland at the Battle of Berea. The Basotho Pony earns international fame as a military mount.",
    era: "African Horsemen",
  },
  {
    year: "1865",
    title: "Emancipation Opens the West",
    description:
      "Freedom brings opportunity. Thousands of formerly enslaved cattlemen — carrying skills inherited from Fulani ancestors — head west. They become 1 in 4 cowboys on the American frontier.",
    era: "The American Chapter",
  },
  {
    year: "1876",
    title: "Nat Love Wins Deadwood",
    description:
      "Born enslaved in Tennessee, Nat Love wins the roping and shooting contest in Deadwood, South Dakota. He earns the name 'Deadwood Dick' and later publishes his autobiography — one of the only firsthand accounts of a Black cowboy's life.",
    era: "The American Chapter",
  },
  {
    year: "1879",
    title: "Bass Reeves: The Real Lone Ranger",
    description:
      "Having escaped slavery during the Civil War, Bass Reeves becomes one of the most effective lawmen in the West — arresting over 3,000 felons across a 32-year career. He is never wounded.",
    era: "The American Chapter",
  },
  {
    year: "1890",
    title: "Bill Pickett Invents Bulldogging",
    description:
      "Bill Pickett develops steer wrestling — grabbing a steer by the horns and wrestling it to the ground. He becomes the first Black cowboy inducted into the Pro Rodeo Hall of Fame.",
    era: "The American Chapter",
  },
  {
    year: "1903",
    title: "Hollywood Begins the Erasure",
    description:
      "\"The Great Train Robbery\" launches the Western film genre with no Black cowboys, no African origins, no truth. A century of manufactured mythology begins.",
    era: "The Erasure",
  },
  {
    year: "1950s",
    title: "History Rewritten in White",
    description:
      "Jim Crow-era studio executives systematically exclude Black actors from Westerns. The cowboy — a figure born in Africa, forged by Black hands — is recast as exclusively white.",
    era: "The Erasure",
  },
  {
    year: "1979",
    title: "South African Rodeo Is Born",
    description:
      "The Rodeo Association of South Africa is established. On January 1, 1980, the inaugural rodeo takes place in Vanderbijlpark — bringing cowboy culture back to African soil.",
    era: "Renaissance",
  },
  {
    year: "1984",
    title: "Bill Pickett Invitational Rodeo",
    description:
      "The first all-Black rodeo circuit launches in America, named for the legendary bulldogger. It becomes the premier celebration of Black cowboy culture, reaching 130,000 spectators annually.",
    era: "Renaissance",
  },
  {
    year: "2023",
    title: "Science Proves What Africa Always Knew",
    description:
      "A peer-reviewed study in Scientific Reports confirms: 400-year-old cattle DNA from the Americas matches breeds found only in Africa. The first cowboys were African. The evidence is in the bones.",
    era: "Renaissance",
  },
  {
    year: "Today",
    title: "The Legacy Rides On",
    description:
      "From Fulani herders crossing the Sahel to Basotho horsemen in the mountains of Lesotho, from Compton Cowboys to Cape Town leather ateliers — the African cowboy tradition was never lost. Only hidden.",
    era: "Renaissance",
  },
];

export const legendFigures: LegendFigure[] = [
  {
    name: "The Fulani Herder",
    nickname: "The Original Cowboy",
    years: "1000 BCE – Present",
    bio: "25 million strong across 20 countries, the Fulani are the world's largest nomadic pastoral group. They recognize each animal by name — by hide color, horn shape, and pedigree. Their rope-work, mounted herding, and transhumance techniques crossed the Atlantic with the slave trade and became the foundation of American cowboy culture.",
    quote:
      "The cattle are not property. They are family. You do not own them — you walk beside them.",
  },
  {
    name: "The Basotho Horseman",
    nickname: "Cowboys of the Plains",
    years: "1825 – Present",
    bio: "When King Moshoeshoe first mounted a horse in 1825, he started a revolution. Within decades, the entire Basotho nation rode. Their ponies gallop up mountains where other horses fear to walk. At the Battle of Berea in 1852, 6,000 mounted Basotho warriors defeated the British Empire. 'Horses are the pride of Basotho men' remains in their praise poetry.",
    quote:
      "A Basotho pony was and is galloped up precipitous mountains where any other horse would fear to proceed at a walk.",
  },
  {
    name: "Nat Love",
    nickname: "Deadwood Dick",
    years: "1854–1921",
    bio: "Born enslaved in Tennessee, Nat Love headed west at 15 and became one of the most skilled cowboys on the frontier. In 1876, he won the roping and shooting contest in Deadwood, South Dakota, earning his legendary nickname. He later published his autobiography — one of the only firsthand accounts of a Black cowboy's life.",
    quote:
      "I carry the marks of a strenuous life, but I have lived — and lived well.",
    image: "/images/history/Nat_Love_1854to1921jpg.webp",
  },
  {
    name: "Bass Reeves",
    nickname: "The Real Lone Ranger",
    years: "1838–1910",
    bio: "Escaped slavery during the Civil War and fled to Indian Territory, where he learned languages of the Five Civilized Tribes. Appointed as a Deputy U.S. Marshal in 1875, Reeves arrested over 3,000 felons during his 32-year career — and was never wounded. Historians believe he inspired the Lone Ranger character.",
    quote:
      "The law is the law, and I am its servant — not the other way around.",
    image: "/images/history/696535520742d357b239d5d83062d981.webp",
  },
  {
    name: "Bill Pickett",
    nickname: "The Bulldogger",
    years: "1870–1932",
    bio: "Bill Pickett invented the rodeo sport of steer wrestling — a technique he developed watching ranch dogs subdue cattle. He performed with the 101 Ranch Wild West Show and became the first Black cowboy inducted into the Pro Rodeo Hall of Fame.",
    quote:
      "I didn't learn it from a book. I learned it from the land.",
    image: "/images/history/814840347e0c8bfe1bd47495ef745b4f.webp",
  },
];

export const renaissanceStats = [
  { value: 268, suffix: "M", label: "Africans living by pastoralism today" },
  { value: 25, suffix: "M", label: "Fulani herders across 20 countries" },
  { value: 100000, suffix: "+", label: "horses still ridden across Lesotho" },
];

export const renaissanceItems = [
  {
    title: "Basotho Horsemen",
    description: "In the mountains of Lesotho, 100,000 horses still carry riders across terrain no vehicle can reach.",
    span: "col-span-1 md:col-span-2 row-span-2",
    image: "/images/history/339c2625dc11312c8460def033a4684e.webp",
  },
  {
    title: "Fulani Transhumance",
    description: "Every dry season, Fulani herders drive cattle 180 miles south — the same migration their ancestors made for millennia.",
    span: "col-span-1 row-span-1",
    image: "/images/history/e0b69639d28029318eb637781b6f7f5a.webp",
  },
  {
    title: "South African Rodeo",
    description: "Since 1980, rodeo has returned to African soil — cowboy culture coming full circle on the continent where it began.",
    span: "col-span-1 row-span-1",
    image: "/images/history/5535e1bca5379e149de6c606d59ba0a2.webp",
  },
  {
    title: "The Urban Renaissance",
    description: "From Compton Cowboys to Fletcher Street Philadelphia, Black riders preserve traditions in the heart of the city.",
    span: "col-span-1 md:col-span-2 row-span-1",
    image: "/images/history/1993_cowboy.webp",
  },
  {
    title: "Cowboy Culture Reclaimed",
    description: "From fashion runways to music, the African cowboy aesthetic is experiencing a global renaissance.",
    span: "col-span-1 row-span-2",
    image: "/images/history/hollywood_cowboy.webp",
  },
  {
    title: "Next Generation",
    description: "Across Africa and its diaspora, a new generation carries the tradition forward — in the saddle and in style.",
    span: "col-span-1 row-span-1",
    image: "/images/history/modern_cowboy.webp",
  },
];
