"use client";
import { FormElementInstance, FormElements } from "./FormElements";

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const DesignerElement = FormElements[element.type].designerComponent
  return <div>DesignerElementWrapper</div>;
}

export default DesignerElementWrapper;
