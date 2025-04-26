import { Content } from "../components/Content";
import { SideBar } from "../components/sidebar";
import { PopUp } from "../ui/PopUI";
import { useRecoilValue } from "recoil";
import { addContentOpenAtom, shareOpenAtom } from "../recoil/Atoms";

export function Dashboard() {
  const shareOpen = useRecoilValue(shareOpenAtom);
  const addOpen = useRecoilValue(addContentOpenAtom);
  return (
    <>
      <div className="flex flex-row relative">
        <SideBar />
        <Content />
      </div>
      {shareOpen && (
        <div className="h-screen w-screen fixed inset-0 bg-slate-600/75 z-50 flex justify-center items-center">
          <PopUp type="share" />
        </div>
      )}
      {addOpen && (
        <div className="h-screen w-screen fixed inset-0 bg-slate-600/75 z-50 flex justify-center items-center">
          <PopUp type="content" />
        </div>
      )}
    </>
  );
}
