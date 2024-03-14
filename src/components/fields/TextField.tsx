"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement } from "../FormElements";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      subtext: "Text field description",
      required: false,
      placeholder: "Enter text",
    },
  }),
  designerButtonElement: {
    icon: MdTextFields,
    label: "Text field",
  },
  designerComponent: () => <div>TextField</div>,
  formComponent: () => <div>Form</div>,
  propertiesComponent: () => <div>Properties</div>,
};

function TextField() {
  return <div>TextField</div>;
}

export default TextField;
