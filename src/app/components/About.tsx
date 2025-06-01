import React from 'react';
import Image from 'next/image';
interface TeamMember {
  name: string;
  image: string;
}
interface TeamSection {
  role: string;
  members: TeamMember[];
}
const About: React.FC = () => {
  const teamSections: TeamSection[] = [
    {
      role: "President & Vice President",
      members: [
        { name: "Neelanshu Karn", image: "/members/neelanshu.jpeg" },
        { name: "Kavya Katal", image: "/members/kavya.jpeg" },
      ]
    },
    {
      role: "UI/UX",
      members: [
        { name: "Pratya Silla", image: "" },
      ]
    },
    {
      role: "Community Manager & Documentation",
      members: [
        { name: "Rashmi Anand", image: "/members/rashmi.jpeg" },
        { name: "Pratiti Paul", image: "/members/pratiti.jpeg" },
      ]
    },
    {
      role: "Social Media/Outreach",
      members: [
        { name: "Rashmi Anand", image: "/members/rashmi.jpeg" },
        { name: "Shaurya Sharma", image: "" },
      ]
    },
    {
      role: "Code Review/PR",
      members: [
        { name: "Kavya Katal", image:"/members/kavya.jpeg" },
        { name: "Abhinav Bajpai", image: "/members/abhinav.jpeg" },
        { name: "Rudraksh Sharma", image: "/members/rudraksh.jpeg" },
      ]
    },
    {
      role: "Workshops/Lectures",
      members: [
        { name: "Abhinav Bajpai", image: "/members/abhinav.jpeg" },
        { name: "Rudraksh Sharma", image: "/members/rudraksh.jpeg"},
        { name: "Kavya Katal", image: "/members/kavya.jpeg" },
        { name: "Param Khodiyar", image: "/members/param.jpeg" },
      ]
    },
    {
      role: "Website (Nebula)",
      members: [
        { name: "Ankit Pandey", image: "/members/ankit.jpeg" },
        { name: "Kunal Vats", image: "/members/kunal.jpeg" },
        { name: "Abhinav Bajpai", image:"/members/abhinav.jpeg" },
        { name: "Kavya Katal", image: "/members/kavya.jpeg" },
        { name: "Param Khodiyar", image: "/members/param.jpeg" },
        { name: "Rudraksh Sharma", image: "/members/rudraksh.jpeg" },
        { name: "Pratyush Parida", image: "/members/pratyush.jpeg" },
        
      ]
    }
  ];

  return (
    
    <section className="min-h-screen w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 " style={{
      
    }}>
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-8 tracking-wider">
              ABOUT NEBULA
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed px-4">
              Project Nebula is SAST&apos;s open-source development initiative where students collaboratively build full-stack
              tools, gain GitHub experience, and participate in a structured contribution challenge.
            </p>
          </header>

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {teamSections.map((section, index) => (
              <article key={index} className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-400 mb-6 sm:mb-8 tracking-wide px-4">
                  {section.role}
                </h2>
                <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 px-4">
                  {section.members.map((member, memberIndex) => (
                    <div key={memberIndex} className="text-center group">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden border-4 border-gray-600 group-hover:border-red-800 transition-colors duration-300 bg-gray-800">
                        {member.image && (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">{member.name}</h3>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <footer className="text-center mt-12 sm:mt-14 md:mt-16">
            <button className="bg-transparent border-2 border-gray-600 text-white px-6 py-2 sm:px-8 sm:py-3 text-base md:text-lg font-semibold hover:bg-red-800 hover:border-red-800 transition-colors duration-300 tracking-wider">
              Guidelines
            </button>
          </footer>
        </div>
      </section>

  );
};

export default About;