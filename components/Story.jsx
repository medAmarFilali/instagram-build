import Image from "next/image";

const Story = ({ profile }) => {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer hover:scale-110 transition transform duration-200 ease-out">
      <div className="absolute border-red-600 border-2 w-16 h-16 rounded-full"></div>
      <div className="relative self-center justify-self-center h-14 w-14 overflow-hidden rounded-full flex items-center justify-center ">
        <Image
          src={profile.avatar}
          alt={profile.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Story;
