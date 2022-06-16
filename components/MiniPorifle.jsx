import Image from "next/image";
import { signOut } from "next-auth/react";

const MiniProfile = ({ session }) => {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <div className="relative flex items-center h-16 w-16 overflow-hidden rounded-full p-[2px] ">
        <Image
          src={
            session?.data?.user?.image
              ? session?.data?.user?.image
              : "/profile.jpg"
          }
          alt="Amar FILALI"
          objectFit="contain"
          layout="fill"
        />
      </div>
      <div className="flex-1 mx-4">
        <h2 className="font-semibold">{session?.data?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button className="text-blue-400 text-sm font-semibold" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
