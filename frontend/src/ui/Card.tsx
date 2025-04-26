// import { JSX } from "react";
import { useRecoilValue } from "recoil";
import { DeleteIcon } from "../icons/delete";
import { LinkIcon } from "../icons/link";
import ShareIcon from "../icons/share";
import { TwitterIcon } from "../icons/twitter";
import { VideoIcon } from "../icons/video";
import { contentAtom } from "../recoil/Atoms";

interface CardProps {
  title: string;
  type: string;
  body?: string;
  tags?: string;
}

const defaultStyles: string =
  "flex flex-col justify-between gap-2 p-2 py-4 bg-white w-80 min-h-40 rounded-lg border border-slate-200";

function Card(props: CardProps) {
  const contentsValue = useRecoilValue(contentAtom);

  return (
    <>
      <div className={`${defaultStyles}`}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2 text-[#3e4245]">
            {props.type === "tweet" && (
              <div>
                <TwitterIcon size="md" />
              </div>
            )}
            {props.type === "video" && (
              <div>
                <VideoIcon size="md" />
              </div>
            )}
            {props.type === "link" && (
              <div>
                <LinkIcon size="md" />
              </div>
            )}
            <p className="text-black font-semibold">{props.title}</p>
          </div>
          <div className="flex flex-row items-center gap-4 text-[#A6A8AA]">
            <div onClick={() => console.log(contentsValue)}>
              <ShareIcon size="md" />
            </div>
            <div onClick={() => handleDelete(props)}>
              <DeleteIcon size="md" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-left">
          {props.type === "tweet" && (
            <div className="break-words w-full">
              {
                <blockquote className="twitter-tweet">
                  <a href={props.body?.replace("x.com", "twitter.com")}></a>
                </blockquote>
              }
            </div>
          )}
          {props.type === "video" && (
            <div className="break-words w-full my-2">
              {
                <iframe
                  // width="560"
                  // height="315"
                  className="rounded-md border-1 border-slate-200 h-[100%]"
                  src={props.body}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              }
            </div>
          )}
          {props.type === "link" && (
            <div className="break-words w-full">
              <a href={props.body} target="_blank">
                <div>Saved an important link to {props.title}</div>
              </a>
            </div>
          )}
        </div>

        <p>tags</p>
      </div>
    </>
  );
}

export default Card;
