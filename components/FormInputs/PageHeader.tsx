/** @format */
// 
// import { AddNewButton } from "./Buttons";
// import HeadingPage from "./Heading";

import HeadingPage from "../backend/Heading";
import AddNewButton from "./AddNewButton";

const PageHeader = ({
  title,
  href,
  btnTitle,
}: {
  btnTitle: string;
  title: string;
  href: string;
}) => {
  return (
    <div>
      <div className="flex justify-between  items-center  mr-5">
        <HeadingPage title={title} />
        <AddNewButton href={href} toolTipText={btnTitle} />
      </div>
    </div>
  );
};

export default PageHeader;
{
  /*   */
}
