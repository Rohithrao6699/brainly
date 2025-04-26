import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useRef } from "react";
import { signin } from "../api/api";

export function SigninContent() {
  const navigate = useNavigate();
  const usernameRef = useRef<any>("");
  const passwordRef = useRef<any>("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const body = { username, password };
    const data = await signin(body);
    console.log(data);
    if (data.success) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
  }
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="bg-[#f6f6f6] rounded-md h-[60%] w-[50%] border-2 border-slate-200">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-8 p-6 h-full w-full"
          >
            <p className="font-bold text-2xl tracking-wide">Login Here</p>
            <input
              className="outline-none border border-[#b0b0b0] rounded-sm h-10 p-2 input-lg text-black placeholder:text-black"
              placeholder="username"
              ref={usernameRef}
            />
            <input
              className="outline-none border border-[#b0b0b0] rounded-sm h-10 p-2 placeholder:text-black"
              placeholder="password"
              ref={passwordRef}
            />
            <Button
              variant="tertiary"
              content="login"
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
