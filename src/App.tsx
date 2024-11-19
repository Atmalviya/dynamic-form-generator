import React, { useState } from "react";
import JsonEditor from "./components/JsonEditor";
import FormPreview from "./components/FormPreview";
import { FormSchema } from "./types/schema";

const App: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema | null>(null);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* JSON Editor */}
      <div className="w-1/2 p-6 flex flex-col overflow-hidden">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Form Schema Editor
        </h2>
        <div className="flex-grow overflow-hidden">
          <JsonEditor onUpdate={setSchema} />
        </div>
      </div>

      {/* Form Preview */}
      <div className="w-1/2 p-6 overflow-auto bg-white border-l border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Live Preview</h2>
        <FormPreview schema={schema} />
      </div>
    </div>
  );
};

export default App;
