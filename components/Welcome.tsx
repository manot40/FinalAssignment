import {
  SignInIcon,
  MarkGithubIcon,
  SignOutIcon,
} from "@primer/octicons-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { UserContext } from "../components/UserContext";
import { Container, Button, Spacer, Link, Text } from "@nextui-org/react";
import supabase from "../utils/supabase";
import styles from "../styles/Home.module.css";

export default function Welcome() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  function handleLogout() {
    supabase.auth.signOut().then(({ error }) => {
      if (error) toast.error("Gagal Logout");
      else {
        setUser("");
        localStorage.removeItem("user");
        toast.success("Berhasil Logout");
      }
    });
  }

  return (
    <Container
      as="main"
      display="flex"
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "100vh", marginTop: "-1.66rem" }}
    >
      <Text h1 className={styles.title}>
        {user !== "" ? "Welcome " : "Tugas Final "}
        <Text
          h1
          className={styles.title}
          style={{
            background: "linear-gradient(111.19deg,#aaffec -63.59%,#ff4ecd -20.3%,#0070f3 70.46%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline",
          }}
        >
          {user !== "" ? user : "React JS"}
        </Text>
      </Text>
      <Spacer y={2} />
      <Text h4>You are{user !== "" ? " " : " not "}logged in</Text>
      <Spacer y={2.4} />
      <Container
        as="div"
        display="flex"
        direction="column"
        alignItems="center"
        justify="center"
      >
        {user === "" ? (
          <Button
            icon={<SignInIcon size={16} />}
            color="gradient"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        ) : (
          <Button
            icon={<SignOutIcon size={16} />}
            color="error"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        )}
        <Button
          icon={<MarkGithubIcon size={16} />}
          color="#333"
          onClick={() =>
            window.open("https://github.com/manot40/FinalAssignment", "_BLANK")
          }
          style={{ marginTop: ".66rem" }}
        >
          Repo
        </Button>
      </Container>
    </Container>
  );
}
