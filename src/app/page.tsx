import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Skills } from "@/components/sections/Skills";
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
      <About about={profile.about} />
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
      <Education education={getEducation()} />
      <Skills skills={getSkills()} />
      <Contact profile={profile} />
    </>
  );
}
