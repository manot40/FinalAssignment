import {
  Container,
  Button,
  Input,
  Spacer,
  Checkbox,
  Avatar,
  Link,
} from "@nextui-org/react";
import { MailIcon, LockIcon } from "@primer/octicons-react";
import ForgotPassword from "../components/ForgotPassword";
import { useState, useEffect, FormEvent } from "react";
import styles from "../styles/Home.module.css";
import supabase from "../utils/supabase";
import { isPasswordStrong } from "../utils";

export default function Login() {
  // Form Input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Form State
  const [isError, setIsError] = useState(false);
  const [pwStrong, setPwStrong] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // Modal State
  const [isForgot, setIsForgot] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);
  useEffect(() => {
    const isStrong = isPasswordStrong(password);
    if (password !== "") isStrong ? setPwStrong(true) : setPwStrong(false);
    else setPwStrong(true);
  }, [password]);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    supabase.auth
      .signIn({ email, password })
      .then(({ user, session, error }) => {
        if (error) onError();
        else {
          console.log(user);
          console.log(session);
        }
      });
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
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            helperColor={isError ? "error" : "default"}
            status={isError ? "error" : "default"}
            contentLeft={<MailIcon size={16} />}
            width="18rem"
            placeholder="Email"
            clearable
          />
          <Spacer />
          <Input.Password
            helperText={
              !pwStrong
                ? "At least 8 char with, num, symbol and one capital"
                : ""
            }
            onChange={(e) => setPassword(e.target.value)}
            helperColor={isError || !pwStrong ? "error" : "default"}
            status={isError || !pwStrong ? "error" : "default"}
            contentLeft={<LockIcon size={16} />}
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
            onClick={(e) => handleFormSubmit(e)}
            style={{ width: "18rem" }}
          >
            Login
          </Button>
        </form>
        <Spacer y={2} />
        <Link color="#333" href="#" onClick={() => setIsForgot(true)} underline>
          Belum punya akun? Registrasi
        </Link>
      </Container>
      <ForgotPassword open={isForgot} close={setIsForgot} />
    </div>
  );
}
