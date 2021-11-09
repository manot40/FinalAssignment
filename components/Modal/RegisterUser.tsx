import {
  Text,
  Button,
  Input,
  Modal,
  Spacer,
  Container,
} from "@nextui-org/react";
import {
  MailIcon,
  LockIcon,
  PersonIcon,
  HistoryIcon,
} from "@primer/octicons-react";
import { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";
import { isEmailValid, isPasswordStrong } from "../../utils";
import supabase from "../../utils/supabase";

interface IProps {
  open: boolean;
  close: (arg: boolean) => void;
}

export default function RegisterUser({ open, close }: IProps) {
  // Form Data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  // Password Validation
  const [repeated, setRepeated] = useState("");
  const [isNotMatch, setIsNotMatch] = useState(false);
  const [pwStrong, setPwStrong] = useState(true);
  // Form State
  const [badEmail, setBadEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  // Password Match
  useEffect(() => {
    password === repeated ? setIsNotMatch(false) : setIsNotMatch(true);
  }, [password, repeated]);

  function handleSubmit() {
    setIsLoading(true);
    if (!badEmail && !isNotMatch && pwStrong) {
      supabase.auth
        .signUp({ email, password }, { data: { fullname } })
        .then(({ user, error }) => {
          if (error) setIsLoading(false), toast.error("Registrasi Gagal");
          else {
            toast.success("Registrasi Berhasil");
            close(false);
          }
          setIsLoading(false);
        });
    }
  }
  function isReady() {
    return (
      !pwStrong ||
      isNotMatch ||
      badEmail ||
      isLoading ||
      fullname === "" ||
      email === "" ||
      password === ""
    );
  }
  function handleClose() {
    close(false);
  }

  return (
    <div>
      <Modal closeButton onClose={handleClose} open={open}>
        <Modal.Header>
          <Text h4>Registrasi Akun Baru</Text>
        </Modal.Header>
        <Modal.Body>
          <Container
            as="div"
            display="flex"
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Spacer y={0.5} />
            <Input
              type="text"
              onChange={(e) => setFullname(e.target.value)}
              contentLeft={<PersonIcon size={16} />}
              width="18rem"
              placeholder="Nama Lengkap"
              clearable
            />
            <Spacer />
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              helperColor={badEmail ? "error" : "default"}
              helperText={
                badEmail ? "Harap masukkan format email yang benar" : ""
              }
              status={badEmail ? "error" : "default"}
              contentLeft={<MailIcon size={16} />}
              width="18rem"
              placeholder="Email"
              clearable
            />
            <Spacer />
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              helperColor={!pwStrong ? "error" : "default"}
              helperText={
                !pwStrong
                  ? "At least 8 char with, num, symbol and one capital"
                  : ""
              }
              status={!pwStrong ? "error" : "default"}
              contentLeft={<LockIcon size={16} />}
              width="18rem"
              placeholder="Password"
              clearable
            />
            <Spacer y={!pwStrong ? 1.5 : 1} />
            <Input
              type="password"
              onChange={(e) => setRepeated(e.target.value)}
              helperColor={isNotMatch ? "error" : "default"}
              helperText={isNotMatch ? "Repeated password didn't match" : ""}
              status={isNotMatch ? "error" : "default"}
              contentLeft={<HistoryIcon size={16} />}
              width="18rem"
              placeholder="Ulangi Password"
              clearable
            />
            <Spacer y={!pwStrong ? 2.5 : 2} />
            <Button
              shadow={!isReady()}
              disabled={isReady()}
              loading={isLoading}
              onClick={() => handleSubmit()}
              style={{ width: "18rem", marginBottom: "1.33rem" }}
            >
              Submit
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
