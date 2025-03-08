"use client"

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
}

const experiences: Experience[] = [
  {
    title: "Web3 Builder",
    company: "UnPin",
    duration: "Sep 2023 - Present (1 yr 7 mos)",
    location: "Worldwide | Remote",
    description: "Building at various hackathons around the globe: EthGlobal, dAGI, Lambda, EthOnline, easyA",
    skills: ["Solidity", "Foundry", "Rust", "EVM", "Blockchain", "Ethereum", "SNARK"],
  },
  {
    title: "Senior Technical Writer",
    company: "Palo Alto Networks",
    duration: "Sep 2022 - Sep 2023 (1 yr 1 mo)",
    location: "Santa Clara, California, United States | Remote",
    description:
      "Maintained API reference documentation for over forty APIs, transitioned API reference site to pan.dev, and validated updates from dev teams.",
    skills: ["Python", "OpenAPI", "Markdown", "Technical Writing", "Git", "Swagger API", "Technical Documentation", "jq"],
  },
  {
    title: "Tech Copywriter",
    company: "RashidMa.com",
    duration: "Jan 2019 - Aug 2022 (3 yrs 8 mos)",
    location: "Remote",
    description: "Created copy for SaaS companies and acquired clients via prospecting, cold emails, and LinkedIn outreach.",
    skills: ["Markdown", "Technical Writing", "Technical Documentation", "Writing", "Sales Prospecting"],
  },
  {
    title: "Senior Software Engineer",
    company: "Baker Hughes",
    duration: "Feb 2018 - Dec 2018 (11 mos)",
    location: "Minden, NV",
    description: "Developed a native mobile app, wrote test cases and documentation, and conducted Git code reviews.",
    skills: ["HTML5", "JavaScript", "C++", "CI/CD", "Git", "C#", "Software Development", "SQL"],
  },
  {
    title: "Senior Solutions Architect",
    company: "Digital Fleet, LLC.",
    duration: "Sep 2016 - Jun 2017 (10 mos)",
    location: "Greater Chicago Area",
    description: "Designed AWS cloud infrastructure, rebuilt a legacy web app, wrote technical documentation, and mentored junior SEs.",
    skills: ["AWS", "MEAN Stack", "Docker", "Git", "CI/CD", "Software Development", "MongoDB"],
  },
];

const ExperienceCard: React.FC<Experience> = ({ title, company, duration, location, description, skills }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} layout>
    <Card className="p-5 shadow-lg rounded-2xl bg-white border border-gray-200 flex flex-row items-start gap-4">
      <CardContent className="flex-1">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-500">{company} • {duration}</p>
        <p className="text-sm text-gray-400">{location}</p>
        <p className="mt-2 text-gray-700">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const ExperienceSection: React.FC = () => (
  <div className="container mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6">Experience</h2>
    <div className="flex flex-col gap-6">
      {experiences.map((exp, index) => (
        <ExperienceCard key={index} {...exp} />
      ))}
    </div>
  </div>
);

export default ExperienceSection;
