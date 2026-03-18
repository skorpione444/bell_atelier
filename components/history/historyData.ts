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
    year: "1825",
    title: "The First Cattlemen",
    description:
      "Enslaved Africans on Texas ranches become the first cowboys in America, managing herds of longhorn cattle across vast open ranges.",
    era: "Pre-War",
  },
  {
    year: "1836",
    title: "Texas Independence",
    description:
      "As the Republic of Texas forms, Black cattlemen are already integral to the ranching economy — skilled ropers, riders, and trail hands.",
    era: "Pre-War",
  },
  {
    year: "1845",
    title: "Annexed, Not Acknowledged",
    description:
      "Texas joins the Union. An estimated 25% of the settler population is of African descent, many working the cattle industry that will define the West.",
    era: "Pre-War",
  },
  {
    year: "1860",
    title: "Managing the Ranches",
    description:
      "With white men leaving for Civil War battlefields, enslaved and free Black cowboys manage Texas's largest ranches — keeping the cattle industry alive.",
    era: "Pre-War",
  },
  {
    year: "1865",
    title: "Emancipation & the Open Range",
    description:
      "Freedom brings opportunity. Thousands of formerly enslaved men head west, bringing unmatched skills in horsemanship and cattle handling.",
    era: "Freedom",
  },
  {
    year: "1866",
    title: "The Great Migration West",
    description:
      "Black cowboys join the massive westward push. Unlike the segregated East, the frontier offers a rare measure of equality — competence is the only currency.",
    era: "Freedom",
  },
  {
    year: "1867",
    title: "The Chisholm Trail Opens",
    description:
      "The legendary cattle trail from Texas to Kansas becomes the proving ground for thousands of cowboys. At least 1 in 4 is Black.",
    era: "Golden Age",
  },
  {
    year: "1870",
    title: "5,000 Black Cowboys Ride",
    description:
      "An estimated 5,000 to 8,000 Black cowboys work the cattle drives of the American West — roughly 25% of all working cowboys.",
    era: "Golden Age",
  },
  {
    year: "1876",
    title: "Nat Love Wins Deadwood",
    description:
      "Born enslaved in Tennessee, Nat Love wins the roping and shooting contest in Deadwood, South Dakota, earning the name \"Deadwood Dick.\"",
    era: "Golden Age",
  },
  {
    year: "1879",
    title: "Bass Reeves: Deputy Marshal",
    description:
      "Having escaped slavery during the Civil War, Bass Reeves becomes one of the most effective lawmen in the West, eventually arresting over 3,000 felons.",
    era: "Golden Age",
  },
  {
    year: "1884",
    title: "End of the Open Range",
    description:
      "Barbed wire and railroad expansion close the open range era. The great cattle drives end, but Black cowboys' legacy endures.",
    era: "Golden Age",
  },
  {
    year: "1890",
    title: "Bill Pickett Invents Bulldogging",
    description:
      "Bill Pickett develops the technique of steer wrestling — grabbing a steer by the horns and wrestling it to the ground. The sport still exists today.",
    era: "Rodeo Era",
  },
  {
    year: "1895",
    title: "Stagecoach Mary Takes the Reins",
    description:
      "Mary Fields becomes the first Black woman — and second woman — to carry U.S. mail. She never misses a day, even in blizzards.",
    era: "Rodeo Era",
  },
  {
    year: "1903",
    title: "The First Western Film",
    description:
      "\"The Great Train Robbery\" launches Hollywood's Western genre. It features no Black cowboys — the first act of erasure in a century-long campaign.",
    era: "Rodeo Era",
  },
  {
    year: "1950s",
    title: "Hollywood Rewrites History",
    description:
      "Jim Crow-era studio executives systematically exclude Black actors from Western films. The cowboy becomes exclusively white in the American imagination.",
    era: "Erasure",
  },
  {
    year: "1971",
    title: "Urban Cowboys Emerge",
    description:
      "Black riding clubs form in Oakland, Compton, and Philadelphia — preserving cowboy traditions in unlikely urban settings.",
    era: "Revival",
  },
  {
    year: "1984",
    title: "Bill Pickett Invitational Rodeo",
    description:
      "The first all-Black rodeo circuit launches, named for the legendary bulldogger. It becomes the premier celebration of Black cowboy culture.",
    era: "Renaissance",
  },
  {
    year: "1994",
    title: "Bill Pickett: Hall of Fame",
    description:
      "Bill Pickett is inducted into the Pro Rodeo Hall of Fame — the first Black honoree. Recognition, though belated, begins to arrive.",
    era: "Renaissance",
  },
  {
    year: "2020",
    title: "\"Old Town Road\" & Cultural Reclamation",
    description:
      "Lil Nas X's record-breaking hit sparks global conversation about Black people in country culture. A new generation discovers the truth.",
    era: "Renaissance",
  },
  {
    year: "Today",
    title: "The Legacy Rides On",
    description:
      "From the Compton Cowboys to Fletcher Street in Philadelphia, Black equestrians carry forward a tradition that was never lost — only hidden.",
    era: "Renaissance",
  },
];

export const legendFigures: LegendFigure[] = [
  {
    name: "Nat Love",
    nickname: "Deadwood Dick",
    years: "1854–1921",
    bio: "Born enslaved in Tennessee, Nat Love headed west at 15 and became one of the most skilled cowboys on the frontier. In 1876, he won the roping and shooting contest in Deadwood, South Dakota, earning his legendary nickname. He later published his autobiography — one of the only firsthand accounts of a Black cowboy's life.",
    quote:
      "I carry the marks of a strenuous life, but I have lived — and lived well.",
    image: "/images/history/Nat_Love_1854to1921jpg.jpg",
  },
  {
    name: "Bass Reeves",
    nickname: "The Real Lone Ranger",
    years: "1838–1910",
    bio: "Escaped slavery during the Civil War and fled to Indian Territory, where he learned languages of the Five Civilized Tribes. Appointed as a Deputy U.S. Marshal in 1875, Reeves arrested over 3,000 felons during his 32-year career — and was never wounded. Historians believe he inspired the Lone Ranger character.",
    quote:
      "The law is the law, and I am its servant — not the other way around.",
    image: "/images/history/696535520742d357b239d5d83062d981.jpg",
  },
  {
    name: "Bill Pickett",
    nickname: "The Bulldogger",
    years: "1870–1932",
    bio: "Bill Pickett invented the rodeo sport of steer wrestling, or \"bulldogging\" — a technique he developed by watching ranch dogs subdue cattle. He performed with the 101 Ranch Wild West Show and became the first Black cowboy inducted into the Pro Rodeo Hall of Fame.",
    quote:
      "I didn't learn it from a book. I learned it from the land.",
    image: "/images/history/814840347e0c8bfe1bd47495ef745b4f.jpg",
  },
  {
    name: "Bose Ikard",
    nickname: "The Trusted Trail Hand",
    years: "1843–1929",
    bio: "Born into slavery in Mississippi, Bose Ikard became one of the most trusted cowboys on the Goodnight-Loving Trail. Charles Goodnight described him as the most skilled and trusted man he ever knew. Ikard survived Comanche engagements and river crossings that claimed many lives.",
    quote:
      "I served him faithfully, and he never forgot me.",
    image: "/images/history/f2d72ac19b7d7f56cbfe3f842a298c12.jpg",
  },
  {
    name: "Mary Fields",
    nickname: "Stagecoach Mary",
    years: "1832–1914",
    bio: "Standing six feet tall and known for her fierce independence, Mary Fields became the first Black woman to carry U.S. mail in 1895. Working in Montana's brutal winters, she never missed a single delivery. When her wagon couldn't make it through the snow, she strapped on snowshoes and carried the mail on foot.",
    quote:
      "Neither snow, nor wolves, nor men could keep me from my appointed rounds.",
  },
];

export const renaissanceStats = [
  { value: 30000, suffix: "+", label: "attend Black rodeo circuits annually" },
  { value: 100, suffix: "+", label: "Black riding clubs active in the U.S." },
  { value: 2000000, suffix: "+", label: "Black Americans in equestrian sports" },
];

export const renaissanceItems = [
  {
    title: "Compton Cowboys",
    description: "A group of Black riders in Compton, California, using horsemanship to steer youth away from gang life.",
    span: "col-span-1 md:col-span-2 row-span-2",
    image: "/images/history/339c2625dc11312c8460def033a4684e.jpg",
  },
  {
    title: "Fletcher Street",
    description: "Philadelphia's century-old Black urban riding culture, keeping tradition alive in the heart of the city.",
    span: "col-span-1 row-span-1",
    image: "/images/history/1993_cowboy.jpg",
  },
  {
    title: "Bill Pickett Invitational",
    description: "The nation's only touring Black rodeo, celebrating excellence in horsemanship since 1984.",
    span: "col-span-1 row-span-1",
    image: "/images/history/5535e1bca5379e149de6c606d59ba0a2.jpg",
  },
  {
    title: "Trail Rides",
    description: "Across the South, massive trail rides draw thousands of Black riders — some events spanning over 100 miles.",
    span: "col-span-1 md:col-span-2 row-span-1",
    image: "/images/history/e0b69639d28029318eb637781b6f7f5a.jpg",
  },
  {
    title: "Cowboy Culture",
    description: "From fashion to music, the Black cowboy aesthetic is experiencing a global renaissance.",
    span: "col-span-1 row-span-2",
    image: "/images/history/hollywood_cowboy.jpg",
  },
  {
    title: "Next Generation",
    description: "Youth riding programs across urban America are introducing a new generation to the saddle.",
    span: "col-span-1 row-span-1",
    image: "/images/history/modern_cowboy.jpg",
  },
];
