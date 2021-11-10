import { hashDecode } from "../utils";
import { useState, useEffect } from "react";
import Welcome from "../components/Welcome";
import styles from "../styles/Home.module.css";
import ResetPassword from "../components/Modal/ResetPassword";

export default function Home() {
  const [isRecovery, setIsRecovery] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const { type, access_token } = hashDecode(window);
    if (access_token && type === "recovery") {
      setIsRecovery(true);
      setToken(access_token);
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Welcome />
      </div>
      {isRecovery && (
        <ResetPassword open={isRecovery} close={setIsRecovery} token={token} />
      )}
    </>
  );
}
