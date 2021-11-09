import { useState, useEffect } from "react";
import Welcome from "../components/Welcome";
import styles from "../styles/Home.module.css";
import ResetPassword from "../components/ResetPassword";
import { hashDecode } from "../utils";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    // @ts-ignore
    const { type, access_token } = hashDecode(window);
    if (type === "recovery") {
      setIsRecovery(true);
      setToken(access_token);
    }
  }, []);

  return (
    <>
      <div className={styles.container}>{!isLoggedIn ? <Welcome /> : null}</div>
      {isRecovery && (
        <ResetPassword open={isRecovery} close={setIsRecovery} token={token} />
      )}
    </>
  );
}
