export type HeroContent = {
  badgeText: string
  headline: string
  headlineAccent: string
  subheadline: string
  ctaPrimaryText: string
  ctaSecondaryText: string
  ratingText: string
  reviewCount: string
  trustBullets: string[]
}

export type StatItem = {
  main: string
  accent: string
  label: string
}

export type FeatureItem = {
  title: string
  desc: string
}

export type FeaturesContent = {
  tag: string
  heading: string
  subheading: string
  items: FeatureItem[]
}

export type StepItem = {
  title: string
  desc: string
}

export type ProcessContent = {
  tag: string
  heading: string
  subheading: string
  steps: StepItem[]
}

export type CheckItem = {
  bold: string
  rest: string
}

export type WhyContent = {
  tag: string
  heading: string
  body: string
  checks: CheckItem[]
  buttonText: string
}

export type TestimonialItem = {
  initials: string
  name: string
  role: string
  text: string
}

export type TestimonialsContent = {
  tag: string
  heading: string
  subheading: string
  items: TestimonialItem[]
}

export type CtaContent = {
  tag: string
  heading: string
  body: string
  buttonText: string
  trustItems: string[]
}

export type HomepageContent = {
  hero: HeroContent
  stats: StatItem[]
  features: FeaturesContent
  process: ProcessContent
  why: WhyContent
  testimonials: TestimonialsContent
  cta: CtaContent
}
