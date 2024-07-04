import { revalidatePath } from "next/cache";
import styles from "./adminPosts.module.css";
import Image from "next/image";

const getData = async () => {
  const res = await fetch("http://localhost:4000/api/blog");

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

// 不建议卸载客户端组件中，导致组件不纯粹，CS混淆在一起
const deletePost = async (formData) => {
  "use server";
  const { id } = Object.fromEntries(formData);

  const res = await fetch(`http://localhost:4000/api/blog/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/admin");
  console.log(res);
};

const AdminPosts = async () => {
  const posts = await getData();

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <div className={styles.detail}>
            <Image
              src={post.img || "/noAvatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span className={styles.postTitle}>{post.title}</span>
          </div>
          <form action={deletePost}>
            <input type="hidden" name="id" value={post._id} />
            <button className={styles.postButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
