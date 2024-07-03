import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
// import { getPosts } from "@/lib/data";

const getData = async () => {
  const res = await fetch("http://localhost:4000/api/blog");

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const BlogPage = async () => {
  // 不经过接口，直接访问数据库
  // const posts = await getPosts();

  // BY API
  const posts = await getData();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
