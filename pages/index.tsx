import { useState } from "react";
import Welcome from "../components/Welcome";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className={styles.container}>
      {!isLoggedIn ? <Welcome /> : null}
    </div>
  );
}
