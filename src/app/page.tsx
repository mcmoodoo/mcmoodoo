import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <Card className="mb-8 border-gray-700">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src="/profile-placeholder.jpg" />
              <AvatarFallback>RM</AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold">Rashid Mak</CardTitle>
            <CardDescription className="text-lg text-gray-300">
              Web3 Developer | DeFi Enthusiast | Technical Writer
            </CardDescription>
            <p className="text-gray-400 mt-2">📍 Austin, Texas, United States</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300">
              Web3 dev & DeFi dork with a quirky mix of skills, combining development with technical writing.
              Actively navigating EVM, SVM, StarkNet, and exploring Arbitrum Stylus to build impactful DeFi solutions.
            </p>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="mb-8 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Technical Skills</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-300 mb-2">Blockchain & Web3</h3>
              <ul className="text-gray-400 space-y-1">
                <li>Smart Contract Development: Solidity, Cairo</li>
                <li>Blockchain Ecosystems: Ethereum (EVM), Solana (SVM), StarkNet, Arbitrum Stylus</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300 mb-2">Programming Languages</h3>
              <ul className="text-gray-400 space-y-1">
                <li>Web3 & Backend: Solidity, Rust, C++</li>
                <li>Full Stack: C#, Java, Python, React</li>
                <li>Scripting & Automation: Bash, Python</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="mb-8 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Notable Projects & Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-300">🏆 EthGlobal 2024 Hackathon Partner Prize Winner</h3>
              <p className="text-gray-400">Project: CollaSwitch (Automated Collateral Swapper)</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300">🚀 UnPin | Web3 Builder (September 2023 - Present)</h3>
              <p className="text-gray-400">Building at EthGlobal, dAGI, Lambda, EthOnline, easyA hackathons worldwide.</p>
            </div>
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-300">🎓 University of Nevada, Reno (2008 - 2012)</h3>
              <p className="text-gray-400">B.S. in Computer Science & Engineering</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300">🎓 National School of Physics & Math (FIZMAT) (2003 - 2006)</h3>
              <p className="text-gray-400">Focus: Math & Computer Science</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
