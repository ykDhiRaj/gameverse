import axios from 'axios';
import { Code, Gamepad, Github, Star, Twitter, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaTwitter, FaLinkedin } from 'react-icons/fa';

function BentoBox({ children, className = '' }) {
  return (
    <div className={`bg-[#1e1e1e] backdrop-blur-sm p-6 rounded-xl transition-all duration-500 hover:bg-[#252525] hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 ${className}`}>
      {children}
    </div>
  );
}

function SocialLink({ href, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
    >
      <Icon size={20} />
    </a>
  );
}

const AboutPage = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const devUsernames = ['ykDhiRaj','yxsh-exe'];; // Replace with actual GitHub usernames
        const responses = await Promise.all(
          devUsernames.map(username => 
            axios.get(`https://api.github.com/users/${username}`)
          )
        );
        setDevelopers(responses.map(res => ({
          ...res.data,
          role: res.data.login === 'johndoe' ? 'Full Stack Developer' : 'UI/UX Designer' 
        })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#161616] text-white flex items-center justify-center">
        <div className="text-xl">Loading developers data...</div>
      </div>
    );
  }

  const staticLinks = [
    {
      href: 'mailto:example@example.com',
      icon: FaEnvelope,
      label: 'Mail',
    },
    {
      href: 'https://twitter.com/example',
      icon: FaTwitter,
      label: 'Twitter',
    },
    {
      href: 'https://linkedin.com/in/example',
      icon: FaLinkedin,
      label: 'LinkedIn',
    },
  ];

  return (
    <div className="min-h-screen  bg-[#161616] text-white p-8">
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          About Gameverse 🎮
        </h1>

        <BentoBox className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Gamepad className="text-white" />
            Our Mission
          </h2>
          <p className="text-gray-300">
            Gameverse is designed to provide gamers with a comprehensive platform to explore and store their favorite games. Whether you're looking for the latest releases, in-depth reviews, or a community of fellow gamers, Gameverse has you covered!
          </p>
        </BentoBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <BentoBox>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Code className="text-white" />
              Technologies Used
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>React for building user interfaces</li>
              <li>Redux for state management</li>
              <li>Axios for API requests</li>
              <li>Tailwind CSS for styling</li>
              <li>Vite for fast development and build processes</li>
            </ul>
          </BentoBox>

          <BentoBox>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Star className="text-white" />
              Key Features
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Extensive game database</li>
              <li>User reviews and ratings</li>
              <li>Personalized recommendations</li>
              <li>Community forums</li>
              <li>Game news and updates</li>
            </ul>
          </BentoBox>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8">
          Meet the Developers
        </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {developers.map((dev, index) => (
            <div key={dev.id} className="space-y-6">
              <BentoBox className="text-center">
                <img
                  src={dev.avatar_url}
                  alt={dev.login}
                  className="w-32 h-32 rounded-full mx-auto mb-4 ring-2 ring-blue-500 transition-transform duration-300 hover:scale-110"
                />
                <h2 className="text-2xl font-bold mb-2">{dev.name || dev.login}</h2>
                <p className="text-gray-400 mb-2">@{dev.login}</p>
                <p className="text-gray-400 mb-4">{dev.bio || (index === 0 ? 'Full Stack Developer' : 'Software Engineer')}</p>
                <div className="flex justify-center space-x-4">
                  <SocialLink href={dev.html_url} icon={Github} />
                  {dev.blog && <SocialLink href={dev.blog} icon={Globe} />}
                  {dev.twitter_username && (
                    <SocialLink
                      href={`https://twitter.com/${dev.twitter_username}`}
                      icon={Twitter}
                    />
                  )}
                  <div className="flex justify-center space-x-4">
                    {staticLinks.map((link, index) => (
                      <SocialLink key={index} href={link.href} icon={link.icon} />
                    ))}
                  </div>
                </div>
              </BentoBox>

              <div className="grid grid-cols-2 gap-4">
                <BentoBox>
                  <div className="flex items-center gap-3">
                    <Star className="text-white" />
                    <div>
                      <h3 className="font-semibold">Stars</h3>
                      <p className="text-sm text-gray-400">{dev.public_repos} Repositories</p>
                    </div>
                  </div>
                </BentoBox>
                <BentoBox>
                  <div className="flex items-center gap-3">
                    <Users className="text-white" />
                    <div>
                      <h3 className="font-semibold">Followers</h3>
                      <p className="text-sm text-gray-400">{dev.followers} People</p>
                    </div>
                  </div>
                </BentoBox>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;