import {FileWithPath} from "@repo/ayasofyazilim-ui/organisms/file-uploader";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {cn} from "../../../utils";
import {Rule} from "../../file-upload";
import {Button} from "@repo/ayasofyazilim-ui/atoms/button";
import {toast} from "@repo/ayasofyazilim-ui/atoms/sonner";

export type FileFormData = {
  file: FileWithPath;
  FileType: string;
  RelatedEntity: string;
  Property: string;
  FileDescription?: string;
  DocumentDate?: string;
  DocumentOriginator?: string;
  DocumentNumber?: string;
};

export type ValidationErrors = Array<{
  members: string[];
  message: string;
}> | null;

export function Form({
  rule,
  validationErrors,
  formData,
  setFormData,
  index,
  propertyId,
}: {
  rule: Rule;
  validationErrors: ValidationErrors;
  formData: FileFormData | null;
  index: number;
  setFormData: Dispatch<SetStateAction<FileFormData[] | null>>;
  propertyId: string;
}) {
  const required = [
    ...(rule.numberRequired ? ["documentNumber"] : []),
    ...(rule.originatorRequired ? ["documentOriginator"] : []),
    ...(rule.dateRequired ? ["documentDate"] : []),
    ...(rule.descriptionRequired ? ["fileDescription"] : []),
  ];
  const fields: Record<string, {type: string; format?: string}> = {};
  if (rule.dateRequired) fields.documentDate = {type: "string", format: "date-time"};
  if (rule.numberRequired) fields.documentNumber = {type: "string"};
  if (rule.originatorRequired) fields.documentOriginator = {type: "string"};
  if (rule.descriptionRequired) fields.fileDescription = {type: "string"};

  const [extraErrors, setExtraErrors] = useState<Record<string, {__errors: string[]}> | undefined>(undefined);

  useEffect(() => {
    if (!validationErrors) return;
    let x = validationErrors.reduce(
      (acc, error) => {
        acc[error.members[0]] = {__errors: [error.message]};
        return acc;
      },
      {} as Record<string, {__errors: string[]}>,
    );
    if (x) setExtraErrors(x);
  }, [validationErrors]);
  return (
    <SchemaForm<FileFormData>
      withScrollArea={false}
      className="p-px"
      formData={formData || undefined}
      uiSchema={{
        "ui:className": cn("grid", Object.keys(fields).length === 1 ? "grid-cols-1" : "sm:grid-cols-2 gap-4"),
        isValidated: {
          "ui:widget": "switch",
          "ui:className": "border px-2 rounded-md flex h-9 [&>div]:h-max self-end items-center",
        },
      }}
      schema={{
        type: "object",
        required: required,
        properties: fields,
      }}
      extraErrors={extraErrors}
      useDefaultSubmit={false}
      onSubmit={({formData: editedFormData}) => {
        if (!editedFormData) return;
        setFormData((prev) => {
          if (prev) {
            const newData = [...prev];
            newData[index] = editedFormData;
            return newData;
          }
          return [editedFormData];
        });
      }}>
      <Button
        className="mt-2 w-full"
        variant="secondary"
        onClick={() => {
          setExtraErrors(undefined);
          toast.success("File data saved.");
        }}>
        Save File Form
      </Button>
    </SchemaForm>
  );
}
