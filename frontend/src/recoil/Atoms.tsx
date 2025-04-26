import { atom } from "recoil";

interface contentInterface {
  title: string;
  link: string;
  type: string;
  data?: string;
  userId?: string;
  tagId?: string;
}
export const contentAtom = atom<contentInterface[]>({
  key: "contentState",
  default: [],
});
