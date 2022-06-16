import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Header from "../../components/Header";
import Image from "next/image";

const signIn = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[calc(100vh - 60px)] ">
        <div className="relative w-64 h-16">
          <Image
            src="/instagram_logo.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>
        <p className="font-xs">
          This is not an app, this is built for educational purpose only!!!
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider, index) => (
            <button
              className="p-3 bg-blue-500 rounded-lg text-white "
              key={index}
              onClick={() =>
                signIntoProvider(provider.id, { callbackUrl: "/" })
              }
            >
              Sign in with {provider.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
