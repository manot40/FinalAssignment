import {
  Container,
  Button,
  Input,
  Spacer,
  Checkbox,
  Avatar,
  Link,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { MailIcon, LockIcon } from "@primer/octicons-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [pwStrong, setPwStrong] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("placeholder");
    return () => {
      setIsLoading(false);
    };
  }, []);

  function verifyPwInput(pw: string) {
    setPassword(pw);
    const criteria = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const isStrong = pw.match(criteria);
    if (pw !== "") isStrong?.length ? setPwStrong(true) : setPwStrong(false);
    else setPwStrong(true);
  }
  function onError() {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 1500);
  }

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
            onChange={(e) => setEmail(e.target.value)}
            helperColor={isError ? "error" : "default"}
            status={isError ? "error" : "default"}
            contentLeft={<MailIcon size={16} />}
            type="email"
            value={email}
            width="18rem"
            placeholder="Email"
            clearable
          />
          <Spacer />
          <Input.Password
            helperText={
              !pwStrong
                ? "Harus memiliki huruf, angka, simbol dan huruf besar"
                : ""
            }
            onChange={(e) => verifyPwInput(e.target.value)}
            helperColor={isError || !pwStrong ? "error" : "default"}
            status={isError || !pwStrong ? "error" : "default"}
            contentLeft={<LockIcon size={16} />}
            value={password}
            width="18rem"
            placeholder="Password"
            clearable
          />
          <Spacer y={!pwStrong ? 1.5 : 1} />
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
          <Button
            shadow
            loading={isLoading}
            color="gradient"
            style={{ width: "18rem" }}
          >
            Login
          </Button>
        </form>
        <Spacer y={2} />
        <Link color="#333" href="#" underline onClick={() => onError()}>
          Belum punya akun? Registrasi
        </Link>
      </Container>
    </div>
  );
}
