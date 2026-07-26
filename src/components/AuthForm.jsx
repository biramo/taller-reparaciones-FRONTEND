// components/AuthForm.jsx
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import H1 from "../components/ui/H1";
import Spinner from "../components/ui/Spinner";
import { useState } from "react";

export default function AuthForm({
  title,
  onSubmit,
  loading,
  error,
  fields,
  footer,
  submitText,
  
})


{
  const [verPassword, setVerPassword]=useState(false);
  const tienePassword=fields.some(field=>field.type==="password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <form
        className="flex flex-col items-center gap-1.5 bg-gray-100 border rounded px-6 py-8 w-80 md:w-100"
        onSubmit={onSubmit}
      >
        <H1>{title}</H1>

        {fields.map((field) => (
          <div key={field.name}
          className="flex flex-col gap-1 w-full">
            <label htmlFor={field.name} className="text-center">{field.label}</label>
            <Input
                id={field.name}
                type={
                    field.type === "password"
                        ? (verPassword ? "text" : "password")
                        : field.type || "text"
                }
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
            />
          </div>
        ))}
        {tienePassword && (
          <div className="flex items-center justify-center mt-1">
              <Input
                  type="checkbox"
                  id="show-password"
                  checked={verPassword}
                  onChange={(e) => setVerPassword(e.target.checked)}
              />

              <label htmlFor="show-password" className="">
                  Mostrar contraseña
              </label>
          </div>
          )}

        <p className="text-red-600 text-sm">{error}</p>
        {footer}
          {loading ? (
            <Spinner />
            
          ) : (
              <Button type="submit" disabled={loading} className="bg-emerald-700 border-gray-700 text-emerald-100 hover:bg-emerald-500">
                {submitText}
              </Button>
          )}
      </form>
    </div>
  );
}