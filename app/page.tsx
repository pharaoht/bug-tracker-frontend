import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <Sidebar/>
    </main>
  );
}

export default Home;