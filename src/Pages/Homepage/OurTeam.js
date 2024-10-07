import React from 'react';
import './OurTeam.css'; // Import the CSS file

const teamMembers = [
  {
    name: 'Orkun',
    surname: 'Kınay ',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQHNbEj9feXwSg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1674232090471?e=1733961600&v=beta&t=b6woYUX1o9Y78ruSoemLcIPQ5WFv5ylVH2Xk2bgm-90', // Replace with actual image URL
    linkedin: 'https://www.linkedin.com/in/orkunkinay/'
  },
  {
    name: 'Barış',
    surname: 'Tekdemir  ',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQH3x-oQVIex5w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689069471654?e=1733961600&v=beta&t=bA--LUsQ6U9bQJErvrgTYi9fDoyaLk8X8vVfBxzcahc', // Replace with actual image URL
    linkedin: 'https://www.linkedin.com/in/bar%C4%B1%C5%9F-tekdemir-7967411b9/'
  },
  {
    name: 'Göktuğ',
    surname: 'Gökyılmaz',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQFSpnt0Mgc0gA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1679078458753?e=1733961600&v=beta&t=pbtylKIEjgTkAsbs6tCghX_FiIgtl8WZ6PnuFreBcb8', // Replace with actual image URL
    linkedin: 'https://www.linkedin.com/in/goktug-gokyilmaz/'
  },
  {
    name: 'Ekmel',
    surname: 'Yavuz ',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    linkedin: 'https://www.linkedin.com/in/ekmel-yavuz-888103211/'
  },
  {
    name: 'Berk',
    surname: 'Ay    ',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQHPQKLX1hY26g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726745387415?e=1733961600&v=beta&t=srVD0iZlAj7PPuYdzGxB9NRFXR15fOt3JRkAFINyxwE', // Replace with actual image URL
    linkedin: 'https://www.linkedin.com/in/berk-ay/'
  },
];

const OurTeam = () => {
  const openLinkedIn = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section id="our-team">
      <div className="OurTeamContainer">
        <h1 className="OurTeamTitle">Meet Our Team</h1>
        <div className="TeamMembers">
          {teamMembers.map((member, index) => (
            <div
              className="TeamMember"
              key={index}
              onClick={() => openLinkedIn(member.linkedin)} // Trigger LinkedIn open on click
              style={{ cursor: 'pointer' }} // Add cursor pointer for better UX
            >
              <img className="MemberImage" src={member.image} alt={`${member.name} ${member.surname}`} />
              <h2 className="MemberName">{member.name} {member.surname}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
