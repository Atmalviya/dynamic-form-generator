import React, { useState } from 'react';
// import { jsonEditor as JSONEditor } from 'jsoneditor-react';
// import JSONEditor from 'jsoneditor-react';
import { JsonEditor as JSONEditor } from 'jsoneditor-react';


import 'jsoneditor-react/es/editor.min.css';
import { z } from 'zod';

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

const JsonEditor: React.FC<{ onUpdate: (schema: any) => void }> = ({ onUpdate }) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (updatedSchema: any) => {
    try {
      schemaValidator.parse(updatedSchema);
      setError(null);
      onUpdate(updatedSchema);
    } catch (err) {
      setError('Invalid JSON schema');
    }
  };

  return (
    <div className="h-full">
      <JSONEditor
        value={{
          formTitle: '',
          formDescription: '',
          fields: [],
        }}
        onChange={handleChange}
        mode="code"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default JsonEditor;
