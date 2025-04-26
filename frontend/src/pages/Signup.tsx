import { HeroContent } from "../components/Hero";
import { SignupContent } from "../components/SignupContent";

export function Signup() {
  return (
    <>
      <div className="flex flex-row justify-between bg-[#e7e7e7]">
        <HeroContent />
        <SignupContent />
      </div>
    </>
  );
}
