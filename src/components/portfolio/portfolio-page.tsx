"use client";

import { Navbar } from "./navbar";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { SkillsSection } from "./skills-section";
import { ShowcaseSection } from "./showcase-section";
import { ProjectsSection } from "./projects-section";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";
import { CertificationsSection } from "./certifications-section";
import { ContactSection } from "./contact-section";
import { Footer } from "./footer";
import { PortfolioIntro } from "./portfolio-intro";

export function PortfolioPage() {
  return (
    <div className="relative">
      <PortfolioIntro />
      <Navbar visible />

      <HeroSection />

      <div className="relative">
        <AboutSection />
        <SkillsSection />
        <ShowcaseSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
