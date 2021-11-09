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
import { isEmailValid, isPasswordStrong } from "../utils";
import ForgotPassword from "../components/Modal/ForgotPassword";
import RegisterUser from "../components/Modal/RegisterUser";
import { useState, useEffect, FormEvent } from "react";
import styles from "../styles/Home.module.css";
import supabase from "../utils/supabase";
import { toast } from "react-toastify";

export default function Login() {
  // Form Input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Form State
  const [isError, setIsError] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [pwStrong, setPwStrong] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // Modal State
  const [isForgot, setIsForgot] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  // Password Validation
  useEffect(() => {
    const isStrong = isPasswordStrong(password);
    if (password !== "") isStrong ? setPwStrong(true) : setPwStrong(false);
    else setPwStrong(true);
  }, [password]);
  // Email Validation
  useEffect(() => {
    const isMailValid = isEmailValid(email);
    if (email !== "") !isMailValid ? setBadEmail(true) : setBadEmail(false);
    else setBadEmail(false);
  }, [email]);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    if (password === "" || email === "" || !pwStrong || isError || badEmail) {
      toast.error("Periksa kembali email/password anda"), setIsLoading(false);
      onError();
    } else {
      supabase.auth.signIn({ email, password }).then(({ user, error }) => {
        if (error) {
          toast.error("Login Gagal. Username/Password Salah");
          onError();
        } else {
          toast.success("Login Successful");
          console.log(user);
        }
        setIsLoading(false);
      });
    }
  }
  function onError() {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 2000);
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
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            helperColor={isError || badEmail ? "error" : "default"}
            helperText={
              badEmail ? "Harap masukkan format email yang benar" : ""
            }
            status={isError || badEmail ? "error" : "default"}
            contentLeft={<MailIcon size={16} />}
            width="18rem"
            placeholder="Email"
            clearable
          />
          <Spacer />
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            helperColor={isError || !pwStrong ? "error" : "default"}
            helperText={
              !pwStrong
                ? "At least 8 char with, num, symbol and one capital"
                : ""
            }
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
            <Link color underline href="#" onClick={() => setIsForgot(true)}>
              Lupa password?
            </Link>
          </Container>
          <Spacer y={2} />
          <Button
            shadow
            loading={isLoading}
            color="primary"
            onClick={(e) => handleFormSubmit(e)}
            style={{ width: "18rem" }}
          >
            Login
          </Button>
        </form>
        <Spacer y={2} />
        <Link
          color="#333"
          underline
          href="#"
          onClick={() => setIsRegister(true)}
        >
          Belum punya akun? Registrasi
        </Link>
      </Container>
      <ForgotPassword open={isForgot} close={setIsForgot} />
      <RegisterUser open={isRegister} close={setIsRegister} />
    </div>
  );
}
