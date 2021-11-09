import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { PersonIcon, MarkGithubIcon } from "@primer/octicons-react";
import { Container, Button, Spacer, Link, Text } from "@nextui-org/react";

export default function Welcome() {
  const router = useRouter();
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
        Tugas Final&nbsp;
        <Link
          color
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React JS
        </Link>
      </Text>
      <Spacer y={1.6} />
      <Text h4>
        Kevin Sandiho | &nbsp;
        <Link href="#" color>
          2201860355
        </Link>
      </Text>
      <Spacer y={3} />
      <Container
        as="div"
        display="flex"
        direction="column"
        alignItems="center"
        justify="center"  
      >
        <Button
          icon={<PersonIcon size={16} />}
          onClick={() => router.push("/login")}
          style={{marginBottom: ".66rem"}}
        >
          Login
        </Button>
        <Button
          icon={<MarkGithubIcon size={16} />}
          color="#333"
          onClick={() =>
            window.open("https://github.com/manot40/FinalAssignment", "_BLANK")
          }
        >
          Repo
        </Button>
      </Container>
    </Container>
  );
}
