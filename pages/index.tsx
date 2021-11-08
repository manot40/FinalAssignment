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
    <div style={{overflowX: 'auto'}} className={styles.container}>
      <Container
        as="div"
        display="flex"
        direction="column"
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Spacer />
        <Avatar
          src="/default.jpg"
          alt="User Profile"
          size={150}
          color="gradient"
          bordered
        />
        <Spacer y={2.5} />
        <form>
          <Input
            width="16rem"
            size="large"
            label="Username"
            placeholder="Masukan Username"
            clearable
          />
          <Spacer />
          <Input.Password
            width="16rem"
            size="large"
            label="Password"
            placeholder="Masukan Password"
            clearable
          />
          <Spacer />
          <Checkbox size="small" label="Ingat saya" checked />
          <Spacer y={2} />
          <Button shadow color="gradient" size="large">
            Login
          </Button>
          <Spacer y={1.5} />
          <Link color underline href="#">
            Lupa password?
          </Link>
          <Spacer y={5} />
          <Link color="#333" underline href="#">
            Tidak memiliki akun? Registrasi
          </Link>
          <Spacer />
        </form>
      </Container>
    </div>
  );
}
