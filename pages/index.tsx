import styles from "../styles/Home.module.css";
import {
  Container,
  Button,
  Input,
  Spacer,
  Checkbox,
  Avatar,
  Link,
  Text,
} from "@nextui-org/react";

export default function Home() {
  return (
    <div className={styles.container}>
      <Container
        as="div"
        display="flex"
        direction="column"
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Avatar
          src="/default.jpg"
          alt="User Profile"
          size={120}
          color="gradient"
          bordered
        />
        <Spacer y={2} />
        <form>
          <Input
            width="18rem"
            size="large"
            label="Username"
            placeholder="Masukan Username"
            clearable
          />
          <Spacer />
          <Input.Password
            width="18rem"
            size="large"
            label="Password"
            placeholder="Masukan Password"
            clearable
          />
          <Spacer />
          <Container
           as="div"
           display="flex"
           direction="row"
           justify="space-between">
             <Checkbox size="small" label="Ingat saya" checked />
             <Link color underline href="#">
               Lupa password?
             </Link>
          </Container>
          <Spacer y={2} />
          <Button shadow color="gradient" size="large">
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
}
