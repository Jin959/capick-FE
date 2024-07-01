import React from 'react';
import {Input, Text} from "@chakra-ui/react";
import {createArrayDataWithId} from "@/utils/func";

interface Props {
  name?: string;
  type?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validation: boolean;
  validationErrorMessages: Array<string>;
}

const InputWithValidation = (props: Props) => {

  const validationErrors = createArrayDataWithId(props.validationErrorMessages);

  return (
    <>
      <Input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        ref={props.inputRef}
        value={props.value}
        onChange={props.onChange}
      />
      {props.validation &&
        validationErrors.map(validationError =>
          <Text
            key={validationError.id}
            fontSize="sm"
            color="red.500"
          >
            {validationError.data}
          </Text>)
      }
    </>
  );
};

export default React.memo(InputWithValidation);