import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { UserContext } from "../components/UserContext";
import { Container, Button, Spacer, Link, Text } from "@nextui-org/react";
import {
  PersonIcon,
  MarkGithubIcon,
  SignOutIcon,
} from "@primer/octicons-react";
import supabase from "../utils/supabase";
import { toast } from "react-toastify";

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
        <Link
          href={user !== "" ? "#" : "https://reactjs.org"}
          target={user !== "" ? "" : "_blank"}
          rel="noopener noreferrer"
          style={{
            background: "linear-gradient(111.19deg,#aaffec -63.59%,#ff4ecd -20.3%,#0070f3 70.46%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {user !== "" ? user : "React JS"}
        </Link>
      </Text>
      <Spacer y={1.6} />
      <Text h4>You are{user !== "" ? " " : " not "}logged in</Text>
      <Spacer y={2} />
      <Container
        as="div"
        display="flex"
        direction="column"
        alignItems="center"
        justify="center"
      >
        {user === "" ? (
          <Button
            icon={<PersonIcon size={16} />}
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
