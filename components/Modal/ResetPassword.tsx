import { Text, Button, Input, Modal, Spacer } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { isPasswordStrong } from "../../utils";
import { toast } from "react-toastify";
import supabase from "../../utils/supabase";

interface IProps {
  open: boolean;
  token: string;
  close: (arg: boolean) => void;
}

export default function ResetPassword({ open = false, token, close }: IProps) {
  const [password, setPassword] = useState("");
  const [repeated, setRepeated] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotMatch, setIsNotMatch] = useState(false);

  useEffect(() => {
    const isStrong = isPasswordStrong(password);
    if (password !== "") isStrong ? setIsError(false) : setIsError(true);
    else setIsError(false);
  }, [password]);
  useEffect(() => {
    password === repeated ? setIsNotMatch(false) : setIsNotMatch(true);
  }, [password, repeated]);

  function handleSubmit() {
    if (!isError || !isNotMatch) {
      setIsLoading(true);
      supabase.auth.api
        .updateUser(token, { password })
        .then(({ data, error }) => {
          if (error) {
            toast.error("Akses reset password invalid atau kadaluarsa");
          } else {
            toast.success("Password berhasil diubah");
          }
          handleClose();
        });
    }
  }
  function handleClose() {
    setIsLoading(false);
    close(false);
  }

  return (
    <div>
      <Modal blur preventClose open={open}>
        <Modal.Header>
          <Text h4 style={{ marginTop: ".5rem" }}>
            Create New Password
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer />
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            helperColor={isError ? "error" : "default"}
            helperText={
              isError ? "At least 8 char with, num, symbol and one capital" : ""
            }
            status={isError ? "error" : "default"}
            label="New Password"
            placeholder="Enter new password"
            clearable
          />
          {isError && <Spacer y={0} />}
          <Input.Password
            onChange={(e) => setRepeated(e.target.value)}
            helperColor={isNotMatch ? "error" : "default"}
            helperText={isNotMatch ? "Repeated password didn't match" : ""}
            status={isNotMatch ? "error" : "default"}
            label="Repeat New Password"
            placeholder="Enter repeated password"
            clearable
          />
          <Spacer y={0} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            loading={isLoading}
            disabled={
              isError || isNotMatch || password === "" || repeated === ""
            }
            onClick={handleSubmit}
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
