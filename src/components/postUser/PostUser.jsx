// import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";

const getData = async (userId) => {
  const res = await fetch(`http://localhost:4000/api/user/${userId}`);

  if (!res.ok) {
    throw new Error("Some thing went wrong");
  }

  return res.json();
};

const PostUser = async ({ userId }) => {
  // BY MONGODB
  // const user = await getUser(userId);

  // BY API
  const user = await getData(userId);

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img ? user.img : "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
