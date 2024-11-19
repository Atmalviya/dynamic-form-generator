import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

const FormPreview: React.FC<{ schema: any }> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('Form Data:', data);
    alert('Form submitted successfully!');
  };

  if (!schema || !schema.fields) return <p>Enter a valid schema to see the preview</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-lg font-bold">{schema.formTitle}</h1>
      <p>{schema.formDescription}</p>

      {schema.fields.map((field: any) => (
        <div key={field.id} className="space-y-2">
          <label className="block text-sm font-medium">{field.label}</label>
          {field.type === 'text' && (
            <input
              type="text"
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="border p-2 rounded w-full"
            />
          )}
          {field.type === 'email' && (
            <input
              type="email"
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="border p-2 rounded w-full"
            />
          )}
          {field.type === 'select' && (
            <select {...register(field.id, { required: field.required })} className="border p-2 rounded w-full">
              {field.options?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {field.type === 'radio' && (
            <div className="space-y-1">
              {field.options?.map((option: any) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option.value}
                    {...register(field.id, { required: field.required })}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          )}
          {errors[field.id] && <p className="text-red-500">This field is required</p>}
        </div>
      ))}

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default FormPreview;
