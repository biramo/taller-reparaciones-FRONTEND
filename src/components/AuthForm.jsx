// components/AuthForm.jsx
import Input from "./Input";
import Button from "./Button";
import H1 from "./H1";
import Spinner from "./Spinner";

export default function AuthForm({
  title,
  onSubmit,
  loading,
  error,
  fields,
  footer,
  submitText,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <form
        className="flex flex-col items-center gap-4 bg-gray-100 border rounded px-6 py-8 w-80 md:w-100 md:h-90"
        onSubmit={onSubmit}
      >
        <H1>{title}</H1>

        {fields.map((field) => (
          <Input
            key={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
          />
        ))}

        <p className="text-red-600 text-sm">{error}</p>
        {footer}
          {loading ? (
            <>
              <Spinner />
            </>
          ) : (
              <Button type="submit" disabled={loading} className="bg-emerald-700 border-gray-700 text-emerald-100 hover:bg-emerald-500">
                {submitText}
              </Button>
          )}
      </form>
    </div>
  );
}