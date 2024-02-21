import React from 'react';
import {Input, Text} from "@chakra-ui/react";

interface Props {
  name?: string;
  type?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validation: boolean;
  validationErrorMessages: Array<string>;
}

interface ValidationError {
  id: number;
  message: string;
}

const createValidationErrorsWithId = (validationErrorMessages: Array<string>) => {
  let id = 1;
  return validationErrorMessages.map(
    (validationErrorMessage) => ({
      id: id++,
      message: validationErrorMessage
    })
  );
}

const InputWithValidation = (props: Props) => {

  const validationErrors: Array<ValidationError> = createValidationErrorsWithId(props.validationErrorMessages);

  return (
    <>
      <Input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        ref={props.inputRef}
        onChange={props.onChange}
      />
      {props.validation &&
        validationErrors.map(validationError =>
          <Text
            key={validationError.id}
            fontSize="sm"
            color="red.500"
          >
            {validationError.message}
          </Text>)
      }
    </>
  );
};

export default React.memo(InputWithValidation);