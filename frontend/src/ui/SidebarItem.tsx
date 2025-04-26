import { ArticleIcon } from "../icons/article";
import { LinkIcon } from "../icons/link";
import { TwitterIcon } from "../icons/twitter";
import { VideoIcon } from "../icons/video";

interface ItemsInterface {
  name: "Tweet" | "Video" | "Links" | "Documents";
}

export function SideBarItem(props: ItemsInterface) {
  return (
    <>
      <div className="flex flex-row items-center justify-start gap-4 pl-5 w-full text-[#364350]">
        {props.name === "Tweet" && <TwitterIcon size="md" />}
        {props.name === "Video" && <VideoIcon size="md" />}
        {props.name === "Links" && <LinkIcon size="md" />}
        {props.name === "Documents" && <ArticleIcon size="md" />}
        <p className="font-normal text-lg">{props.name}</p>
      </div>
    </>
  );
}
