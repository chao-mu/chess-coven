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
    <form onSubmit={handleSubmit(submit)} className="flex items-center">
        <input
          {...register("san", { validate: validateSan })}
          className="border border-gray-300 rounded-l-md p-2 w-24"
          placeholder="Enter SAN"
          autoComplete="off"
          autoFocus
        />
        <button
          type="submit"
          className="bg-lime-500 text-white rounded-r-md p-2 hover:bg-lime-600 mr-2"
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
