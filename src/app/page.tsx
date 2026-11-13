import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { EducationAndSkills } from "@/components/sections/EducationAndSkills";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { getEducation, getProfile, getSkills } from "@/lib/profile";
import {
  getFeaturedProject,
  getOtherProjects,
  getProjectEyebrow,
  getProjectPath,
} from "@/lib/projects";

export default function HomePage() {
  const profile = getProfile();
  const featured = getFeaturedProject();

  const otherProjects = getOtherProjects().map((project) => ({
    project,
    href: getProjectPath(project.slug),
    eyebrow: getProjectEyebrow(project),
  }));

  return (
    <>
      <Hero profile={profile} featuredHref={`#${featured.slug}`} />
      <FeaturedProject
        project={featured}
        href={getProjectPath(featured.slug)}
        eyebrow={getProjectEyebrow(featured)}
      />
      <ProjectGrid
        eyebrow={profile.projects.eyebrow}
        title={profile.projects.title}
        items={otherProjects}
      />
      <EducationAndSkills education={getEducation()} skills={getSkills()} />
      <About about={profile.about} />
      <Contact profile={profile} />
    </>
  );
}
