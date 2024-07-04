import { revalidatePath } from "next/cache";
import styles from "./adminUsers.module.css";
import Image from "next/image";

const getUsers = async () => {
  const res = await fetch("http://localhost:4000/api/user");

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const deleteUser = async (formData) => {
  // 用到了表单action 必须是服务端函数
  "use server";
  const { id } = Object.fromEntries(formData);

  const res = await fetch(`http://localhost:4000/api/user/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  revalidatePath("/admin");
};

const AdminUsers = async () => {
  const users = await getUsers();

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users.map((user) => (
        <div className={styles.user} key={user._id}>
          <div className={styles.detail}>
            <Image
              src={user.img || "/noAvatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span>{user.username}</span>
          </div>
          <form action={deleteUser}>
            <input type="hidden" name="id" value={user._id} />
            <button className={styles.userButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
