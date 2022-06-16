import { useEffect, useState } from "react";
import Stories from "./Stories";
import { faker } from "@faker-js/faker";
import Posts from "./Posts";
import MiniProfile from "./MiniPorifle";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

const Feed = () => {
  const session = useSession();
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

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ">
      <section className="col-span-2">
        <Stories session={session} />
        <Posts />
      </section>

      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed">
          {/* Mini profile */}
          {session.data && <MiniProfile session={session} />}
          {/* Suggestions */}
          {session.data && <Suggestions />}
        </div>
      </section>
    </main>
  );
};

export default Feed;
