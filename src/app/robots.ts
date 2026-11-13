import type { MetadataRoute } from "next";

import { getProfile } from "@/lib/profile";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = getProfile();

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
