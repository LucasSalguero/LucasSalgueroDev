import type { MetadataRoute } from "next";

import { getProfile } from "@/lib/profile";
import { getAllProjects, getProjectPath } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = getProfile();

  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...getAllProjects().map((project) => ({
      url: `${siteUrl}${getProjectPath(project.slug)}`,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.9 : 0.7,
    })),
  ];
}
