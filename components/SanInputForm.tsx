import React from "react";
import { useForm } from "react-hook-form";

type SanInputFormProps = {
  onSubmit: (san: string) => void;
  isWrong: boolean;
};

type FormValues = {
  san: string
}


export const SanInputForm = ({ onSubmit, isWrong }: SanInputFormProps) => {
  const { register, handleSubmit, reset, formState: { errors }} = useForm<FormValues>();

  const submit = ({ san }: FormValues) => {
    onSubmit(san);
    reset();
  }

  const validateSan = (san: string) => {
    // https://stackoverflow.com/questions/40007937/regex-help-for-chess-moves-san
    const regex = /[BRQNK][a-h][1-8]|[BRQNK][a-h]x[a-h][1-8]|[BRQNK][a-h][1-8]x[a-h][1-8]|[BRQNK][a-h][1-8][a-h][1-8]|[BRQNK][a-h][a-h][1-8]|[BRQNK]x[a-h][1-8]|[a-h]x[a-h][1-8]=(B+R+Q+N)|[a-h]x[a-h][1-8]|[a-h][1-8]x[a-h][1-8]=(B+R+Q+N)|[a-h][1-8]x[a-h][1-8]|[a-h][1-8][a-h][1-8]=(B+R+Q+N)|[a-h][1-8][a-h][1-8]|[a-h][1-8]=(B+R+Q+N)|[a-h][1-8]|[BRQNK][1-8]x[a-h][1-8]|[BRQNK][1-8][a-h][1-8]/

    return regex.test(san) || "Invalid SAN";
  }


  return (
    <form onSubmit={handleSubmit(submit)} className="flex items-center gap-2">
        <input
          {...register("san", { validate: validateSan })}
          className="w-24 p-2 text-xl bg-transparent border-2 border-purple-500 rounded-lg"
          placeholder="SAN"
          autoComplete="off"
        />
        <button
          type="submit"
          className="p-2 text-xl border-2 border-purple-500 rounded-lg"
        >
          Submit
        </button>
      {
        errors.san ? (
          <span className="text-red-500">{errors.san?.message}</span>
        ) : isWrong ? (
          <span className="text-red-500">Incorrect</span>
        ) : null
      }
    </form>

  );
};
