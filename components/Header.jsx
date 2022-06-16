import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/instagram_logo.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>
        <div className="relative inline-grid lg:hidden w-10 cursor-pointer">
          <Image
            src="/instagram_logo_min.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>

        {/* Middle: Search input field */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none ">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 h-8 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black "
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" onClick={() => router.push("/")} />
          <MenuIcon className="h-6 md:hidden cursor-pointer " />
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute bg-red-600 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center -left-2 -top-1">
                  3
                </div>
              </div>
              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <div
                className="relative rounded-full h-8 w-8 border cursor-pointer overflow-hidden"
                onClick={signOut}
              >
                <Image
                  src={
                    session?.user?.image ? session.user.image : "/profile.jpg"
                  }
                  alt="Amar FILALI"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
