interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary";
  content: string;
  size: "sm" | "md" | "lg";
  icon?: any;
  textStyle: "sm" | "md" | "lg";
  type?: "submit" | "reset" | "button" | undefined;
}

const VaraintStyles = {
  primary: "bg-violet-200 text-violet-300",
  secondary: "bg-violet-400 text-white",
  tertiary: "bg-[#85a4f4] text-black",
};

const SizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-3 px-6",
};

const textStyles = {
  sm: "font-medium",
  md: "font-normal text-lg text-center",
  lg: "font-medium",
};

const DefaultStyles =
  "flex flex-row justify-center gap-3 items-center rounded-lg cursor-pointer text-center";

function Button(props: ButtonProps) {
  return (
    <>
      <button
        type={props.type}
        className={`${VaraintStyles[props.variant]} ${SizeStyles[props.size]} 
        ${textStyles[props.textStyle]} 
        ${DefaultStyles}`}
      >
        {props.icon}
        <p className="className={`${textStyles[props.textStyle]}`">
          {props.content}
        </p>
      </button>
    </>
  );
}

export default Button;
