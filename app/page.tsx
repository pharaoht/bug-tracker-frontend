'use client'
import Dashboard from "@/containers/Dashboard/Dashboard";
import styles from "./page.module.css";
import Issues from "@/containers/Issues/Issues";
import Messages from "@/containers/Messages/Messages";
import Teams from "@/containers/Teams/Teams";
import ModuleWrapper from "@/components/ModuleWrapper/ModuleWrapper";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";
import { DashboardContextProvider } from "../context/DashboardContext";
import { IssueContextProvider } from "@/context/IssueContainerContext";

const Home = () => {

  const [ pageIndex, setPageIndex ] = useState(0);

  const modules = [
    {
      component: () => (
        <DashboardContextProvider>
          <Dashboard />
        </DashboardContextProvider>
      ),
      key: 'dashboard'
    },
    { 
      component: () => (
        <IssueContextProvider>
          <Issues/>
        </IssueContextProvider>
      ), 
      key: 'issues' 
    },
    { 
      component: () => (
        <Messages/>
      ), 
      key: 'messages' 
    },
    {
      component: () => (
        <Teams />
      ),
      key: 'teams'
    }
  ]



  return (
    <main className={styles.main}>
      <Sidebar
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />

      {
        <ModuleWrapper>
          { modules[pageIndex].component() }
        </ModuleWrapper>
      }
    </main>
  );
}

export default Home;