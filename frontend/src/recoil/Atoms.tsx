import { atom } from "recoil";

interface contentInterface {
  title: string;
  link: string;
  type: string;
  data?: string;
  userId?: string;
  tagId?: string;
  _id: string;
}
export const contentAtom = atom<contentInterface[]>({
  key: "contentState",
  default: [],
});

export const shareOpenAtom = atom({
  key: "shareOpen",
  default: false,
});
export const addContentOpenAtom = atom({
  key: "addContentOpen",
  default: false,
});

export const shareBrainPublic = atom({
  key: "shareBrain",
  default: false,
});
