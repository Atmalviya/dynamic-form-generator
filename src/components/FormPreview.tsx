import React from "react";
import {
  useForm,
  SubmitHandler,
  FieldError,
  FieldErrors,
} from "react-hook-form";
import type { FormSchema, FormField } from "../types/schema";

interface FormPreviewProps {
  schema: FormSchema | null;
}
const getErrorMessage = (
  error: FieldError | FieldErrors | undefined,
): string => {
  if (!error) return "";
  return error.message?.toString() || "This field is required";
};

const FormField: React.FC<{
  field: FormField;
  register: any;
  error?: string;
}> = ({ field, register, error }) => {
  const baseInputClass =
    "border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const errorInputClass = error ? "border-red-500" : "border-gray-300";

  switch (field.type) {
    case "text":
    case "email":
      return (
        <input
          type={field.type}
          {...register(field.id, {
            required: field.required,
            pattern: field.validation
              ? {
                  value: new RegExp(field.validation.pattern),
                  message: field.validation.message,
                }
              : undefined,
          })}
          placeholder={field.placeholder}
          className={`${baseInputClass} ${errorInputClass}`}
        />
      );

    case "select":
      return (
        <select
          {...register(field.id, { required: field.required })}
          className={`${baseInputClass} ${errorInputClass}`}
        >
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div className="space-y-2">
          {field.options?.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                value={option.value}
                {...register(field.id, { required: field.required })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      );

    case "textarea":
      return (
        <textarea
          {...register(field.id, { required: field.required })}
          placeholder={field.placeholder}
          className={`${baseInputClass} ${errorInputClass} min-h-[100px]`}
        />
      );

    default:
      return null;
  }
};

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };
  const handleReset = () => {
    reset();
  };

  if (!schema || !schema.fields) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">Enter a valid schema to see the preview</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {schema.formTitle}
          </h1>
          <p className="mt-2 text-gray-600">{schema.formDescription}</p>
        </div>

        {schema.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <FormField
              field={field}
              register={register}
              error={getErrorMessage(errors[field.id])}
            />
            {errors[field.id] && (
              <p className="text-sm text-red-600">
                {getErrorMessage(errors[field.id])}
              </p>
            )}
          </div>
        ))}

        <div className="pt-4 flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPreview;
