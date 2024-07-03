import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Margaret</div>
      <div className={styles.text}>
        Margaret creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
