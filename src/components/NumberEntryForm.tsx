// React Hook Form
import { useForm } from "react-hook-form";

type NumberEntryFormProps = {
  onSubmit: (number: number) => void;
  label: string;
  isWrong: boolean;
};

type FormValues = {
  number: number;
};

export const NumberEntryForm = ({
  isWrong,
  label,
  onSubmit,
}: NumberEntryFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const submit = handleSubmit(({ number }: FormValues, e) => {
    e?.preventDefault();
    onSubmit(number);
    reset();
  });

  return (
    <form
      onSubmit={submit}
      className="flex flex-col items-center justify-center gap-2"
    >
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="number" className="text-lg">
          {label}
        </label>
        <div className="flex gap-2">
          <input
            {...register("number", { required: true })}
            type="number"
            className="w-24 border-2 border-amber-500 bg-transparent p-1 text-lg"
            placeholder="Number"
            autoComplete="off"
          />
          <button
            type="submit"
            className="border-2 border-amber-500 p-1 text-lg"
          >
            Submit
          </button>
        </div>
        {errors.number ? (
          <span className="text-red-500">{errors.number?.message}</span>
        ) : isWrong ? (
          <span className="text-red-500">Incorrect</span>
        ) : null}
      </div>
    </form>
  );
};
