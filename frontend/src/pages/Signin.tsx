import { HeroContent } from "../components/Hero";
import { SigninContent } from "../components/SigninContent";

export function Signin() {
  return (
    <>
      <div className="flex flex-row justify-between bg-[#e7e7e7]">
        <HeroContent />
        <SigninContent />
      </div>
    </>
  );
}
