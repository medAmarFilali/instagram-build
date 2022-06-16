import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(
      [...Array(5)].map((_, i) => {
        return {
          id: i,
          name: faker.name.findName(),
          avatar: faker.internet.avatar(),
          username: faker.internet.userName(),
          company: faker.company.companyName(),
        };
      })
    );
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-semibold text-gray-400">
          Suggestions for you
        </h3>
        <button className="font-semibold text-gray-600 ">See all</button>
      </div>

      {suggestions.map((profile) => (
        <div key={profile.id} className="flex item-center justify-between mt-3">
          <div className="relative w-10 h-10 rounded-full ml-4 overflow-hidden p-[2px] border">
            <Image
              src={profile.avatar}
              alt={profile.username}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-xs text-gray-300 truncate">
              Works at {profile.company}
            </h3>
          </div>
          <button className="text-blue-400 text-xs font-semibold ml-2">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
