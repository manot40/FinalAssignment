import { Text, Button, Input, Modal, Spacer } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { isPasswordStrong } from "../utils";
import supabase from "../utils/supabase";

interface IProps {
  open: boolean;
  token: string;
  close: (arg: boolean) => void;
}

export default function ResetPassword({ open = false, token, close }: IProps) {
  const [password, setPassword] = useState("");
  const [repeated, setRepeated] = useState("");
  const [isError, setIsError] = useState(false);
  const [isNotMatch, setIsNotMatch] = useState(false);

  useEffect(() => {
    const isStrong = isPasswordStrong(password);
    if (password !== "") isStrong ? setIsError(false) : setIsError(true);
    else setIsError(false);
  }, [password]);

  function handleSubmit() {
    if (!isError) {
      supabase.auth.api
        .updateUser(token, { password })
        .then(({ data, error }) => {
          if (error) console.log(error);
          else {
            console.log(data);
            handleClose();
          }
        });
    }
  }
  function isRepeatPass(val: string) {
    setRepeated(val);
    password === val ? setIsNotMatch(false) : setIsNotMatch(true);
  }
  function handleClose() {
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
            onChange={(e) => isRepeatPass(e.target.value)}
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
            auto
            disabled={
              isError || isNotMatch || password === "" || repeated === ""
            }
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
