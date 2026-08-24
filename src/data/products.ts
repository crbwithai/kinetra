export type BranchId =
  | 'football'
  | 'athletics'
  | 'swimming'
  | 'basketball'
  | 'volleyball'
  | 'tennis'
  | 'table-tennis'
  | 'badminton'
  | 'handball'
  | 'cycling'
  | 'boxing'
  | 'wrestling'
  | 'weightlifting'
  | 'yoga'
  | 'rowing'
  | 'climbing'
  | 'skiing'
  | 'ice-skating'
  | 'archery'
  | 'judo'

export type DeepShowcaseBranchId = 'football' | 'athletics' | 'swimming'

export type TechId = 'kinegrip' | 'terracell' | 'hydroskin' | 'aeromesh'

export interface Branch {
  number: string // '01'..'20'
  id: BranchId
  // Künye TR/EN terim çifti — aynı anahtar tr.json ve en.json'da da var.
  // Künye ikisini AYNI ANDA gösterir, sayfanın o an hangi dilde olduğundan bağımsız.
  termKey: string
  signatureProductNameKey: string
  image: string
}

export interface Price {
  amount: number // TL, tam sayı
  currency: 'TRY'
  discountedAmount?: number
}

export interface ShowcaseProduct {
  id: string
  nameKey: string
  descriptionKey: string
  price: Price
  techId: TechId
  image: string
}

export interface DeepShowcase {
  branchId: DeepShowcaseBranchId
  products: [ShowcaseProduct, ShowcaseProduct, ShowcaseProduct, ShowcaseProduct]
}

export interface Technology {
  id: TechId
  name: string // özel isim, çevrilmez (KINEGRIP, TERRACELL, HYDROSKIN, AEROMESH)
  claimKey: string
  evidenceKey: string
}

export const BRANCHES: Record<BranchId, Branch> = {
  football: {
    number: '01',
    id: 'football',
    termKey: 'branches.football.term',
    signatureProductNameKey: 'branches.football.product',
    image: '/products/football/signature.webp',
  },
  athletics: {
    number: '02',
    id: 'athletics',
    termKey: 'branches.athletics.term',
    signatureProductNameKey: 'branches.athletics.product',
    image: '/products/athletics/signature.webp',
  },
  swimming: {
    number: '03',
    id: 'swimming',
    termKey: 'branches.swimming.term',
    signatureProductNameKey: 'branches.swimming.product',
    image: '/products/swimming/signature.webp',
  },
  basketball: {
    number: '04',
    id: 'basketball',
    termKey: 'branches.basketball.term',
    signatureProductNameKey: 'branches.basketball.product',
    image: '/products/basketball/signature.webp',
  },
  volleyball: {
    number: '05',
    id: 'volleyball',
    termKey: 'branches.volleyball.term',
    signatureProductNameKey: 'branches.volleyball.product',
    image: '/products/volleyball/signature.webp',
  },
  tennis: {
    number: '06',
    id: 'tennis',
    termKey: 'branches.tennis.term',
    signatureProductNameKey: 'branches.tennis.product',
    image: '/products/tennis/signature.webp',
  },
  'table-tennis': {
    number: '07',
    id: 'table-tennis',
    termKey: 'branches.table-tennis.term',
    signatureProductNameKey: 'branches.table-tennis.product',
    image: '/products/table-tennis/signature.webp',
  },
  badminton: {
    number: '08',
    id: 'badminton',
    termKey: 'branches.badminton.term',
    signatureProductNameKey: 'branches.badminton.product',
    image: '/products/badminton/signature.webp',
  },
  handball: {
    number: '09',
    id: 'handball',
    termKey: 'branches.handball.term',
    signatureProductNameKey: 'branches.handball.product',
    image: '/products/handball/signature.webp',
  },
  cycling: {
    number: '10',
    id: 'cycling',
    termKey: 'branches.cycling.term',
    signatureProductNameKey: 'branches.cycling.product',
    image: '/products/cycling/signature.webp',
  },
  boxing: {
    number: '11',
    id: 'boxing',
    termKey: 'branches.boxing.term',
    signatureProductNameKey: 'branches.boxing.product',
    image: '/products/boxing/signature.webp',
  },
  wrestling: {
    number: '12',
    id: 'wrestling',
    termKey: 'branches.wrestling.term',
    signatureProductNameKey: 'branches.wrestling.product',
    image: '/products/wrestling/signature.webp',
  },
  weightlifting: {
    number: '13',
    id: 'weightlifting',
    termKey: 'branches.weightlifting.term',
    signatureProductNameKey: 'branches.weightlifting.product',
    image: '/products/weightlifting/signature.webp',
  },
  yoga: {
    number: '14',
    id: 'yoga',
    termKey: 'branches.yoga.term',
    signatureProductNameKey: 'branches.yoga.product',
    image: '/products/yoga/signature.webp',
  },
  rowing: {
    number: '15',
    id: 'rowing',
    termKey: 'branches.rowing.term',
    signatureProductNameKey: 'branches.rowing.product',
    image: '/products/rowing/signature.webp',
  },
  climbing: {
    number: '16',
    id: 'climbing',
    termKey: 'branches.climbing.term',
    signatureProductNameKey: 'branches.climbing.product',
    image: '/products/climbing/signature.webp',
  },
  skiing: {
    number: '17',
    id: 'skiing',
    termKey: 'branches.skiing.term',
    signatureProductNameKey: 'branches.skiing.product',
    image: '/products/skiing/signature.webp',
  },
  'ice-skating': {
    number: '18',
    id: 'ice-skating',
    termKey: 'branches.ice-skating.term',
    signatureProductNameKey: 'branches.ice-skating.product',
    image: '/products/ice-skating/signature.webp',
  },
  archery: {
    number: '19',
    id: 'archery',
    termKey: 'branches.archery.term',
    signatureProductNameKey: 'branches.archery.product',
    image: '/products/archery/signature.webp',
  },
  judo: {
    number: '20',
    id: 'judo',
    termKey: 'branches.judo.term',
    signatureProductNameKey: 'branches.judo.product',
    image: '/products/judo/signature.webp',
  },
}

export const DEEP_SHOWCASES: Record<DeepShowcaseBranchId, DeepShowcase> = {
  football: {
    branchId: 'football',
    products: [
      {
        id: 'cleats',
        nameKey: 'showcase.football.cleats.name',
        descriptionKey: 'showcase.football.cleats.description',
        price: { amount: 2499, currency: 'TRY' },
        techId: 'kinegrip',
        image: '/products/football/cleats.webp',
      },
      {
        id: 'ball',
        nameKey: 'showcase.football.ball.name',
        descriptionKey: 'showcase.football.ball.description',
        price: { amount: 899, currency: 'TRY' },
        techId: 'terracell',
        image: '/products/football/ball.webp',
      },
      {
        id: 'jersey',
        nameKey: 'showcase.football.jersey.name',
        descriptionKey: 'showcase.football.jersey.description',
        price: { amount: 799, currency: 'TRY' },
        techId: 'aeromesh',
        image: '/products/football/jersey.webp',
      },
      {
        id: 'shinGuards',
        nameKey: 'showcase.football.shinGuards.name',
        descriptionKey: 'showcase.football.shinGuards.description',
        price: { amount: 349, currency: 'TRY' },
        techId: 'terracell',
        image: '/products/football/shin-guards.webp',
      },
    ],
  },
  athletics: {
    branchId: 'athletics',
    products: [
      {
        id: 'shoes',
        nameKey: 'showcase.athletics.shoes.name',
        descriptionKey: 'showcase.athletics.shoes.description',
        price: { amount: 2299, currency: 'TRY' },
        techId: 'terracell',
        image: '/products/athletics/shoes.webp',
      },
      {
        id: 'spikes',
        nameKey: 'showcase.athletics.spikes.name',
        descriptionKey: 'showcase.athletics.spikes.description',
        price: { amount: 1899, currency: 'TRY' },
        techId: 'kinegrip',
        image: '/products/athletics/spikes.webp',
      },
      {
        id: 'singlet',
        nameKey: 'showcase.athletics.singlet.name',
        descriptionKey: 'showcase.athletics.singlet.description',
        price: { amount: 599, currency: 'TRY' },
        techId: 'aeromesh',
        image: '/products/athletics/singlet.webp',
      },
      {
        id: 'baton',
        nameKey: 'showcase.athletics.baton.name',
        descriptionKey: 'showcase.athletics.baton.description',
        price: { amount: 249, currency: 'TRY' },
        techId: 'kinegrip',
        image: '/products/athletics/baton.webp',
      },
    ],
  },
  swimming: {
    branchId: 'swimming',
    products: [
      {
        id: 'suit',
        nameKey: 'showcase.swimming.suit.name',
        descriptionKey: 'showcase.swimming.suit.description',
        price: { amount: 1299, currency: 'TRY' },
        techId: 'hydroskin',
        image: '/products/swimming/suit.webp',
      },
      {
        id: 'goggles',
        nameKey: 'showcase.swimming.goggles.name',
        descriptionKey: 'showcase.swimming.goggles.description',
        price: { amount: 449, currency: 'TRY' },
        techId: 'hydroskin',
        image: '/products/swimming/goggles.webp',
      },
      {
        id: 'cap',
        nameKey: 'showcase.swimming.cap.name',
        descriptionKey: 'showcase.swimming.cap.description',
        price: { amount: 129, currency: 'TRY' },
        techId: 'hydroskin',
        image: '/products/swimming/cap.webp',
      },
      {
        id: 'kickboard',
        nameKey: 'showcase.swimming.kickboard.name',
        descriptionKey: 'showcase.swimming.kickboard.description',
        price: { amount: 349, currency: 'TRY' },
        techId: 'terracell',
        image: '/products/swimming/kickboard.webp',
      },
    ],
  },
}

export const TECHNOLOGIES: Record<TechId, Technology> = {
  kinegrip: {
    id: 'kinegrip',
    name: 'KINEGRIP',
    claimKey: 'tech.kinegrip.claim',
    evidenceKey: 'tech.kinegrip.evidence',
  },
  terracell: {
    id: 'terracell',
    name: 'TERRACELL',
    claimKey: 'tech.terracell.claim',
    evidenceKey: 'tech.terracell.evidence',
  },
  hydroskin: {
    id: 'hydroskin',
    name: 'HYDROSKIN',
    claimKey: 'tech.hydroskin.claim',
    evidenceKey: 'tech.hydroskin.evidence',
  },
  aeromesh: {
    id: 'aeromesh',
    name: 'AEROMESH',
    claimKey: 'tech.aeromesh.claim',
    evidenceKey: 'tech.aeromesh.evidence',
  },
}
