import dynamic from "next/dynamic";

const Model = dynamic(() => import("@/components/Model"), { ssr: false });

export default function Home() {
  return (
    <div className="grid grid-cols-2 w-full justify-center items-center bg-slate-400">
      <div className="col-span-1 flex flex-col items-start ">
        <h3 className="text-xl font-bold w-fit ml-auto">
          Bem-vindos a la bienal
        </h3>
        <h1 className="text-[5rem] font-bold ml-auto">2024</h1>
      </div>
      <div className="col-span-1">
        <Model />
      </div>
    </div>
  );
}
