import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <p>the page is not found</p>
      <Link href="/">Back To Home</Link>
    </div>
  );
};

export default NotFound;
