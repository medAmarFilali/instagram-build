import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";

const Stories = ({ session }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(
      [...Array(20)].map((_, i) => ({
        name: faker.name.findName(),
        userame: faker.internet.userName(),
        phone: faker.phone.phoneNumber(),
        website: faker.internet.domainName(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar(),
        address: faker.address.streetAddress(),
        id: i,
      }))
    );
  }, []);

  const ownProfile = {
    avatar: session?.data?.user?.image,
    name: session?.data?.user?.name,
  };

  return (
    <div className="flex space-x-4 p-6 bg-white mt-8 border-gray-200 rounded-xl overflow-x-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-50 scrollbar-thumb-gray-200">
      {session.data && <Story profile={ownProfile} />}
      {suggestions.map((profile) => (
        <Story key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default Stories;
