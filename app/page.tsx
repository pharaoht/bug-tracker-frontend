import Dashboard from "@/containers/Dashboard/Dashboard";
import styles from "./page.module.css";
import Main from "@/components/Main/Main";
import Issues from "@/containers/Issues/Issues";
import Messages from "@/containers/Messages/Messages";
import Teams from "@/containers/Teams/Teams";
import ModuleWrapper from "@/components/ModuleWrapper/ModuleWrapper";

const Home = () => {

  const pageIndex = 0;

  const modules = [
    Dashboard,
    Issues,
    Messages,
    Teams,
  ];


  return (
    <main className={styles.main}>
      <ModuleWrapper>
        {modules[pageIndex]()}
      </ModuleWrapper>
    </main>
  );
}

export default Home;