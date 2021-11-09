import { Text, Button, Input, Modal, Spacer } from "@nextui-org/react";
import { MailIcon } from "@primer/octicons-react";
import { useState, useEffect } from "react";
import { isEmailValid } from "../utils";
import supabase from "../utils/supabase";

interface IProps {
  open: boolean;
  close: (arg: boolean) => void;
}

export default function ForgotPassword({ open = false, close }: IProps) {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const isMailValid = isEmailValid(email);
    if (email !== "") !isMailValid ? setIsError(true) : setIsError(false);
    else setIsError(false);
  }, [email]);

  function handleSubmit() {
    if (!isError) {
      supabase.auth.api.resetPasswordForEmail(email).then(({ data, error }) => {
        if (error) console.log(error);
        else {
          handleClose();
        }
      });
    }
  }
  function handleClose() {
    close(false);
  }

  return (
    <div>
      <Modal onClose={handleClose} open={open}>
        <Modal.Header>
          <Text h4 style={{ marginTop: ".5rem" }}>
            Reset Password
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer />
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            helperColor={isError ? "error" : "default"}
            helperText={isError ? "Harap masukkan format email yang benar" : ""}
            status={isError ? "error" : "default"}
            contentLeft={<MailIcon size={16} />}
            labelPlaceholder="Email"
            clearable
          />
          <Spacer y={0} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={handleClose}>
            Close
          </Button>
          <Button
            auto
            disabled={isError || email === ""}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
