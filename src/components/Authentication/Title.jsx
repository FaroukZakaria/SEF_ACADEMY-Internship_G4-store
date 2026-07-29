import { AiOutlineThunderbolt } from "react-icons/ai";
const Title = ({ mainTitle, semiTitle, lastTitle }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center text-2xl font-bold text-amazon-orange">
          <AiOutlineThunderbolt size={35} />
          <h1 className="capitalize">{mainTitle}</h1>
        </div>
        <h2 className="text-amazon-textDark font-semibold text-xl">
          {semiTitle}
        </h2>
        <div className="flex flex-col md:flex-row md:gap-1 text-amazon-textLight text-sm text-center">
          {lastTitle}
        </div>
      </div>
    </>
  );
};
export default Title;
