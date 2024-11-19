declare module "jsoneditor-react" {
    import { JSONEditorMode, JSONEditorOptions } from "jsoneditor";
    import React from "react";
  
    export interface JsonEditorProps extends JSONEditorOptions {
      value: any;
      onChange?: (value: any) => void;
      mode?: JSONEditorMode;
      ace?: any;
      theme?: string;
    }
  
    export class JsonEditor extends React.Component<JsonEditorProps> {}
  }
  