export interface FormField {
    id: string;
    type: "text" | "email" | "select" | "radio" | "textarea";
    label: string;
    required: boolean;
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    validation?: {
      pattern: string;
      message: string;
    };
  }
  
  export interface FormSchema {
    formTitle: string;
    formDescription: string;
    fields: FormField[];
  }
  