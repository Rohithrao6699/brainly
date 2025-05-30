import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CrossIcon } from "../icons/cross";
import PlusIcon from "../icons/plus";
import ShareIcon from "../icons/share";
import Button from "./Button";
import {
  addContentOpenAtom,
  contentAtom,
  shareBrainPublic,
  shareOpenAtom,
} from "../recoil/Atoms";
import { useEffect, useRef } from "react";
import { setContent, shareBrain } from "../api/api";
import toast from "react-hot-toast";

interface PopupInterface {
  type: "content" | "share";
}
export function PopUp({ type }: PopupInterface) {
  const setContents = useSetRecoilState(contentAtom);
  const contentValue = useRecoilValue(contentAtom);
  const [shareBrainValue, setshareBrainValue] =
    useRecoilState(shareBrainPublic);
  const setShareOpen = useSetRecoilState(shareOpenAtom);
  const setAddOpen = useSetRecoilState(addContentOpenAtom);

  const titleRef = useRef<any>("");
  const linkRef = useRef<any>("");
  const typeRef = useRef<any>("");

  async function handleSubmit() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = typeRef.current?.value;

    const token = localStorage.getItem("token");
    const body = { title, link, type };
    if (token) {
      const data = await setContent(body, token);
      console.log(data);
      setContents((prev) => [...prev, data.content]);
    }
  }

  async function handleShare() {
    const token = localStorage.getItem("token");
    const shareValue = !shareBrainValue;
    console.log(shareValue);
    if (token) {
      let share = { share: shareValue };
      const data = await shareBrain(share, token);
      //returns { success: true, hashedLink: hashedLink.hash }
      if (data.success) {
        let link = `http://localhost:3000/api/v1/content/${data.hashedLink}`;

        navigator.clipboard
          .writeText(link)
          .then(() => toast.success(`Copied brain link to clipboard`))
          .catch(() => toast.error("error copying link"));
      }
    }
    setshareBrainValue(shareValue);
  }

  useEffect(() => {
    console.log("atoms data", contentValue);
  }, [contentValue]);

  return (
    <>
      {/* <div className="flex w-screen h-screen justify-center items-center"> */}
      <div className="bg-white flex flex-col gap-5 max-h-74 min-w-50 max-w-96 p-4 rounded-md shadow-lg">
        {type === "content" && (
          <div className="flex flex-col gap-3 break-words w-60">
            <div onClick={() => setAddOpen(false)} className="self-end">
              <CrossIcon size="lg" />
            </div>
            <div className="flex flex-col items-stretch gap-2">
              <input
                placeholder="title"
                className="bg-gray-200 h-10 rounded p-2 outline-none"
                ref={titleRef}
              />
              <input
                placeholder="link"
                className="bg-gray-200 h-10 rounded p-2 outline-none"
                ref={linkRef}
              />
              <select
                ref={typeRef}
                className="appearance-none bg-gray-200 text-gray-600 font-medium px-4 py-2 rounded cursor-pointer hover:bg-gray-300 transition duration-200 outline-none"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Type?
                </option>
                <option
                  className="hover:bg-blue-100 cursor-pointer"
                  value="tweet"
                >
                  Tweet
                </option>
                <option
                  className="hover:bg-blue-100 cursor-pointer"
                  value="video"
                >
                  Video
                </option>
                <option
                  className="hover:bg-blue-100 cursor-pointer"
                  value="link"
                >
                  Link
                </option>
              </select>
            </div>
          </div>
        )}
        {type === "share" && (
          <>
            <div className="flex flex-col items-start gap-3 break-words">
              <div className="flex flex-row items-center justify-between w-full">
                {shareBrainValue ? (
                  <h3>Delete your Shareable link</h3>
                ) : (
                  <h3>Share Your Second Brain</h3>
                )}
                <div onClick={() => setShareOpen(false)}>
                  <CrossIcon size="lg" />
                </div>
              </div>
              {shareBrainValue ? (
                <p>Your sharedLink will no longer be active!</p>
              ) : (
                <p>
                  Share youe entire collection of notes, tweets, videos,
                  documents with others. They'll be able to import your content
                  into their own second brain!
                </p>
              )}
            </div>
          </>
        )}
        <div
          onClick={type === "share" ? handleShare : handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <Button
            variant={type === "share" ? "secondary" : "primary"}
            content={
              type === "share"
                ? shareBrainValue
                  ? "Delete"
                  : "Share Brain"
                : "Add Content"
            }
            size="md"
            textStyle="md"
            icon={
              type === "share" ? (
                <ShareIcon size="md" />
              ) : (
                <PlusIcon size="md" />
              )
            }
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
