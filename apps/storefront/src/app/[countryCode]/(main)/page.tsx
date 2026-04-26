import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import StatsBar from "@modules/home/components/stats-bar"
import FeaturesSection from "@modules/home/components/features-section"
import ProcessSection from "@modules/home/components/process-section"
import WhySection from "@modules/home/components/why-section"
import Testimonials from "@modules/home/components/testimonials"
import CtaSection from "@modules/home/components/cta-section"
export const metadata: Metadata = {
  title: "OrthoLab Center — Reclaim Your Comfort. Move Without Limits.",
  description:
    "The OLC FlexWave combines therapeutic heat, 360° air compression, and targeted massage into one effortless 15-minute daily session.",
}

export default async function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturesSection />
      <ProcessSection />
      <WhySection />
      <Testimonials />
      <CtaSection />
    </>
  )
}
