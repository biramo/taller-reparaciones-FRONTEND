import Input from '../ui/Input';
import Button from '../ui/Button';

export default function EntityForm({ campos, values, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-2 mb-6 flex-wrap">
      {campos.map((campo) => (
        <Input
          key={campo.name}
          type={campo.type || 'text'}
          placeholder={campo.label}
          value={values[campo.name]}
          onChange={onChange(campo.name)}
          required={campo.required}
          min={campo.min}
          max={campo.max}
          className="border rounded px-3 py-2 flex-1 min-w-60"
        />
      ))}
      <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Añadir
      </Button>
    </form>
  );
}