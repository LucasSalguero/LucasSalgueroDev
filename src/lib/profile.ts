import { z } from "zod";

import { education as rawEducation } from "@/content/education";
import { profile as rawProfile } from "@/content/profile";
import { skills as rawSkills } from "@/content/skills";

import {
  educationSchema,
  profileSchema,
  skillsSchema,
  type Education,
  type Profile,
  type Skills,
} from "./schemas";

function parse<T>(schema: z.ZodType<T>, input: unknown, file: string): T {
  const result = schema.safeParse(input);

  if (!result.success) {
    throw new Error(`Contenido inválido en src/content/${file}:\n${z.prettifyError(result.error)}`);
  }

  return result.data;
}

const profile = parse(profileSchema, rawProfile, "profile.ts");
const education = parse(educationSchema, rawEducation, "education.ts");
const skills = parse(skillsSchema, rawSkills, "skills.ts");

export function getProfile(): Profile {
  return profile;
}

export function getEducation(): Education {
  return education;
}

export function getSkills(): Skills {
  return skills;
}
