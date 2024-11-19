import React, { useState } from 'react';
import JsonEditor from './components/JsonEditor';
import FormPreview from './components/FormPreview';

const App: React.FC = () => {
  const [schema, setSchema] = useState<any>(null);

  return (
    <div className="flex h-screen">
      {/* JSON Editor */}
      <div className="w-1/2 border-r p-4 overflow-auto">
        <h2 className="text-lg font-bold mb-2">JSON Editor</h2>
        <JsonEditor onUpdate={setSchema} />
      </div>

      {/* Form Preview */}
      <div className="w-1/2 p-4 overflow-auto">
        <h2 className="text-lg font-bold mb-2">Form Preview</h2>
        <FormPreview schema={schema} />
      </div>
    </div>
  );
};

export default App;
