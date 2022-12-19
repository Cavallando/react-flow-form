import React, { PropsWithChildren } from "react";
import { Button, ButtonWrapper } from "./styled";

type ButtonProps = PropsWithChildren<{
  onClick: (e: React.SyntheticEvent) => void;
}>;

const ButtonComp: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <ButtonWrapper>
      <Button onClick={onClick}>{children}</Button>
    </ButtonWrapper>
  );
};

export default ButtonComp;
