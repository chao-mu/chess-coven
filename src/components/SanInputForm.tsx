import React from "react";
import { useForm } from "react-hook-form";

type SanInputFormProps = {
  onSubmit: (san: string) => void;
  isWrong: boolean;
};

type FormValues = {
  san: string;
};

export const SanInputForm = ({ onSubmit, isWrong }: SanInputFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const submit = ({ san }: FormValues) => {
    onSubmit(san);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-2"
    >
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="san" className="text-lg">
          Continuation
        </label>
        <div className="flex gap-2">
          <input
            {...register("san")}
            className="w-24 border-2 border-amber-500 bg-transparent p-1 text-lg"
            placeholder="SAN"
            autoComplete="off"
          />
          <button
            type="submit"
            className="border-2 border-amber-500 p-1 text-lg"
          >
            Submit
          </button>
        </div>
        {errors.san ? (
          <span className="text-red-500">{errors.san?.message}</span>
        ) : isWrong ? (
          <span className="text-red-500">Incorrect</span>
        ) : null}
      </div>
    </form>
  );
};
