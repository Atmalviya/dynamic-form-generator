import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { z } from "zod";
import type { FormSchema } from "../types/schema";
const schemaValidator = z.object({
    formTitle: z.string(),
    formDescription: z.string(),
    fields: z.array(
      z.object({
        id: z.string(),
        type: z.enum(['text', 'email', 'select', 'radio', 'textarea']),
        label: z.string(),
        required: z.boolean(),
        placeholder: z.string().optional(),
        options: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
        validation: z
          .object({
            pattern: z.string(),
            message: z.string(),
          })
          .optional(),
      })
    ),
  });

const defaultValue: FormSchema = {
  formTitle: "New Form",
  formDescription: "Please fill out this form",
  fields: [],
};

interface JsonEditorProps {
  onUpdate: (schema: FormSchema) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onUpdate }) => {
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState(JSON.stringify(defaultValue, null, 2));

  useEffect(() => {
    handleValidation(code);
  }, []);

  const handleValidation = (jsonString: string) => {
    try {
      const parsedJson = JSON.parse(jsonString);
      const validatedSchema = schemaValidator.parse(parsedJson);
      setError(null);
      onUpdate(validatedSchema);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof SyntaxError) {
        setError("Invalid JSON syntax");
      } else {
        setError("Invalid JSON schema");
      }
    }
  };

  const handleChange = (value: string) => {
    setCode(value);
    handleValidation(value);
  };

  return (
    <div className="flex flex-col h-full rounded-lg shadow-lg bg-white">


      <div
        className="flex-grow overflow-auto"
        style={{
          maxHeight: "calc(100vh - 200px)", 
        }}
      >
        <Editor
          value={code}
          onValueChange={handleChange}
          highlight={(code) => highlight(code, languages.json, "json")}
          padding={16}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          className="min-h-full"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default JsonEditor;
