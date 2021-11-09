import {
  Container,
  Button,
  Input,
  Spacer,
  Checkbox,
  Avatar,
  Link,
} from "@nextui-org/react";
import styles from "../styles/Home.module.css";
import { MailIcon, LockIcon } from "@primer/octicons-react";

export default function Login() {
  return (
    <div className={styles.container}>
      <Container
        as="div"
        display="flex"
        direction="column"
        alignItems="center"
        style={{ marginTop: "14vh", marginBottom: "14vh" }}
      >
        <Avatar
          src="/default.jpg"
          alt="User Profile"
          size={128}
          color="gradient"
          bordered
        />
        <Spacer y={2} />
        <form>
          <Input
            contentLeft={<MailIcon size={16} />}
            type="email"
            width="18rem"
            placeholder="Email"
            clearable
          />
          <Spacer />
          <Input.Password
            contentLeft={<LockIcon size={16} />}
            width="18rem"
            placeholder="Password"
            clearable
          />
          <Spacer />
          <Container
            as="div"
            display="flex"
            direction="row"
            justify="space-between"
          >
            <Checkbox size="small" label="Ingat saya" checked />
            <Link color underline href="#">
              Lupa password?
            </Link>
          </Container>
          <Spacer y={2} />
          <Button shadow color="gradient" style={{ width: "18rem" }}>
            Login
          </Button>
        </form>
        <Spacer y={2} />
        <Link color="#333" underline href="#">
          Belum punya akun? Registrasi
        </Link>
      </Container>
    </div>
  );
}
