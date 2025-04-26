import { useRef } from "react";
import Button from "../ui/Button";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";

export function SignupContent() {
  const navigate = useNavigate();
  const usernameRef = useRef<any>("");
  const nameRef = useRef<any>("");
  const passwordRef = useRef<any>("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;

    const body = { username, password, name };
    const data = await signup(body);
    console.log(data);
    if (data.success) {
      navigate("/signin");
    }
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="bg-[#f6f6f6] rounded-md h-[70%] w-[50%] border-2 border-slate-200">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-8 p-6 h-full w-full"
          >
            <p className="font-bold text-2xl tracking-wide">Sign Up</p>
            <input
              className="outline-none border border-[#b0b0b0] rounded-sm h-10 p-2 input-lg text-black placeholder:text-black"
              placeholder="username"
              ref={usernameRef}
            />
            <input
              className="outline-none border border-[#b0b0b0] rounded-sm h-10 p-2 placeholder:text-black"
              placeholder="name"
              ref={nameRef}
            />
            <input
              className="outline-none border border-[#b0b0b0] rounded-sm h-10 p-2 placeholder:text-black"
              placeholder="password"
              ref={passwordRef}
            />
            <Button
              variant="tertiary"
              content="sign-up"
              size="md"
              textStyle="md"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}
