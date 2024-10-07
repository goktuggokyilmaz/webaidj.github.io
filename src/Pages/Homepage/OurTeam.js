import React from 'react';
import './OurTeam.css'; // Import the CSS file

const teamMembers = [
  {
    name: 'Orkun',
    surname: 'Kınay',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    linkedin: 'https://www.linkedin.com/in/orkunkinay/'
  },
  {
    name: 'Barış',
    surname: 'Tekdemir',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    linkedin: 'https://www.linkedin.com/in/bar%C4%B1%C5%9F-tekdemir-7967411b9/'
  },
  {
    name: 'Göktuğ',
    surname: 'Gökyılmaz',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    linkedin: 'https://www.linkedin.com/in/goktug-gokyilmaz/'
  },
  {
    name: 'Ekmel',
    surname: 'Yavuz',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    linkedin: 'https://www.linkedin.com/in/ekmel-yavuz-888103211/'
  },
  {
    name: 'Berk',
    surname: 'Ay',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    linkedin: 'https://www.linkedin.com/in/berk-ay/'
  },
];

const OurTeam = () => {
  return (
    <section id="our-team">
    <div className="OurTeamContainer">
      <h1 className="OurTeamTitle">Meet Our Team</h1>
      <div className="TeamMembers">
        {teamMembers.map((member, index) => (
          <div className="TeamMember" key={index}>
            <img className="MemberImage" src={member.image} alt={`${member.name} ${member.surname}`} />
            <h2 className="MemberName">{member.name} {member.surname}</h2>
            <a className="LinkedInLink" href={member.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default OurTeam;
