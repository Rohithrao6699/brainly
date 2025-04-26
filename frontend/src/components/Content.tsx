import PlusIcon from "../icons/plus";
import ShareIcon from "../icons/share";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  addContentOpenAtom,
  contentAtom,
  shareOpenAtom,
} from "../recoil/Atoms";
import { useEffect } from "react";
import { getContent } from "../api/api";

export function Content() {
  const [contents, setContents] = useRecoilState(contentAtom);
  const setShareOpen = useSetRecoilState(shareOpenAtom);
  const setAddOpen = useSetRecoilState(addContentOpenAtom);

  function getEmbedUrl(youtubeUrl: string): string {
    const url = new URL(youtubeUrl);
    const videoId = url.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  }

  async function fetchDocuments() {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await getContent(token);
      if (data.success) {
        setContents(data.content);
      }
    }
  }
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <>
      <div className="h-screen bg-[#F9FBFC] flex flex-col gap-10 w-full">
        <div className="flex flex-row justify-between items-center py-6 px-4">
          <h1 className="font-bold text-2xl">All Notes</h1>
          <div className="flex flex-row justify-end items-center gap-4 py-2">
            <div onClick={() => setShareOpen(true)}>
              <Button
                variant="primary"
                size="md"
                textStyle="md"
                content="Share Brain"
                icon={<ShareIcon size="md" />}
              />
            </div>
            <div onClick={() => setAddOpen(true)}>
              <Button
                variant="secondary"
                size="md"
                textStyle="md"
                content="Add Content"
                icon={<PlusIcon size="md" />}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-start gap-2 overflow-auto px-4">
          {contents.map(({ title, link, type, _id }) =>
            type === "video" ? (
              <Card
                key={_id}
                id={_id}
                title={title}
                body={getEmbedUrl(link)}
                type={type}
              />
            ) : (
              <Card key={_id} id={_id} title={title} body={link} type={type} />
            )
          )}
        </div>
      </div>
    </>
  );
}
