import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ExperienceSection from '@/components/Experience';

// Content data as a JSON object
const pageContent = {
  profile: {
    name: "Rashid Mak",
    title: "Software Engineer | Technical Writer",
    location: "Austin, Texas, United States",
    bio: "Full-stack software engineer and technical writer. Web3 builder: won several prizes at EthGlobal hackathons. Owned API Reference docs at Palo Alto Networks."
  },
  skills: {
    blockchain: {
      title: "Blockchain & Web3",
      items: [
        "Smart Contract Development: Solidity, Cairo",
        "Blockchain Ecosystems: Ethereum (EVM), Solana (SVM), StarkNet, Arbitrum Stylus"
      ]
    },
    programming: {
      title: "Programming Languages",
      items: [
        "Web3 & Backend: Solidity, Rust, C++",
        "Full Stack: C#, Java, Python, React",
        "Scripting & Automation: Bash, Python"
      ]
    }
  },
  workExperience: [
    {
      title: "Web3 Builder",
      company: "UnPin",
      period: "September 2023 - Present",
      items: [
        "Building DeFi and Web3 solutions at global hackathons",
        "EthGlobal 2024 Hackathon Partner Prize Winner"
      ]
    },
    {
      title: "Senior Technical Writer",
      company: "Palo Alto Networks",
      period: "2022 - 2023",
      items: [
        "Maintained API reference documentation for 40+ unique APIs",
        "Transitioned the API reference site to pan.dev with enhanced UI",
        "Implemented docs-as-code workflow through CI/CD pipelines"
      ]
    },
    {
      title: "Tech Copywriter",
      company: "RashidMa.com",
      period: "2019 - 2022",
      items: [
        "Created concise and compelling copy for SaaS companies",
        "Developed technical documentation and marketing content"
      ]
    },
    {
      title: "Senior Software Engineering Roles",
      company: "",
      period: "2010 - 2018",
      items: [
        "Senior Software Engineer at Baker Hughes (2018)",
        "Senior Solutions Architect at Digital Fleet (2016-2017)",
        "Software Engineering positions at leadPops, Adicio, PACCAR, and more",
        "Experience in cloud infrastructure, full-stack development, and technical documentation"
      ]
    }
  ],
  projects: [
    {
      title: "EthGlobal 2024 Hackathon Partner Prize Winner",
      description: "Project: CollaSwitch (Automated Collateral Swapper)"
    },
    {
      title: "UnPin | Web3 Development",
      period: "September 2023 - Present",
      description: "Participating in hackathons including EthGlobal, dAGI, Lambda, EthOnline, and easyA."
    }
  ],
  education: [
    {
      institution: "University of Nevada, Reno",
      period: "2008 - 2012",
      degree: "B.S. in Computer Science & Engineering"
    },
    {
      institution: "National School of Physics & Math (FIZMAT)",
      period: "2003 - 2006",
      focus: "Focus: Math & Computer Science"
    }
  ]
};

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <Card className="mb-8 border-gray-200 shadow-sm">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src="/rashid-profile.jpg" />
              <AvatarFallback>{pageContent.profile.name.split(' ')[0]}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold">{pageContent.profile.name}</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {pageContent.profile.title}
            </CardDescription>
            <p className="text-gray-500 mt-2">📍 {pageContent.profile.location}</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              {pageContent.profile.bio}
            </p>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="mb-8 border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Technical Skills</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">{pageContent.skills.blockchain.title}</h3>
              <ul className="text-gray-600 space-y-1">
                {pageContent.skills.blockchain.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">{pageContent.skills.programming.title}</h3>
              <ul className="text-gray-600 space-y-1">
                {pageContent.skills.programming.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Work Experience Section */}
        <Card className="mb-8 border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Work Experience Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pageContent.workExperience.map((job, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-700">
                  {job.title}{job.company ? ` | ${job.company}` : ''} ({job.period})
                </h3>
                <ul className="text-gray-600 space-y-1">
                  {job.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <ExperienceSection />

        {/* Projects Section */}
        <Card className="mb-8 border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Notable Projects & Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pageContent.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-700">{project.title}{project.period ? ` (${project.period})` : ''}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pageContent.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-700">{edu.institution} ({edu.period})</h3>
                <p className="text-gray-600">{edu.degree || edu.focus}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
