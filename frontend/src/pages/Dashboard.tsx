import { useState } from "react";
import { Content } from "../components/Content";
import { SideBar } from "../components/sidebar";
import { PopUp } from "../ui/PopUI";

export function Dashboard() {
  const [shareOpen, setshareOpen] = useState(false);
  const [addOpen, setaddOpen] = useState(false);
  return (
    <>
      <div className="flex flex-row relative">
        <SideBar />
        <Content
          onShareclose={() => setshareOpen(true)}
          onAddclose={() => setaddOpen(true)}
        />
      </div>
      {shareOpen && (
        <div className="h-screen w-screen fixed inset-0 bg-slate-600/75 z-50 flex justify-center items-center">
          <PopUp type="share" onclose={() => setshareOpen(false)} />
        </div>
      )}
      {addOpen && (
        <div className="h-screen w-screen fixed inset-0 bg-slate-600/75 z-50 flex justify-center items-center">
          <PopUp type="content" onclose={() => setaddOpen(false)} />
        </div>
      )}
    </>
  );
}
