import { BrainIcon } from "../icons/brain";
import { SideBarItem } from "../ui/SidebarItem";

export function SideBar() {
  return (
    <>
      <div className="w-64 bg-[#FFFFFF] flex flex-col items-center gap-20 py-4 border-r-1 border-slate-200">
        <div className="flex flex-row items-center justify-start w-full gap-3 px-2">
          <BrainIcon size="xlg" />
          <h1 className="font-bold text-3xl tracking-wide text-center text-[#1B2336]">
            Brainly
          </h1>
        </div>

        <div className="flex flex-col w-[100%] gap-6">
          <SideBarItem name="Tweet" />
          <SideBarItem name="Video" />
          <SideBarItem name="Links" />
          <SideBarItem name="Documents" />
        </div>
      </div>
    </>
  );
}
