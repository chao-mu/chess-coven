import React from "react";
import { useForm } from "react-hook-form";

type SanInputFormProps = {
  onSubmit: (san: string) => void;
  onReset?: () => void;
  isWrong: boolean;
};

type FormValues = {
  san: string
}


export const SanInputForm = ({ onSubmit, isWrong, onReset }: SanInputFormProps) => {
  const { register, setValue, handleSubmit, reset, getValues, formState: { errors }} = useForm<FormValues>();

  const submit = ({ san }: FormValues) => {
    onSubmit(san);
    reset();
  }

  const squareNames = ["a", "b", "c", "d", "e", "f", "g"]
  const rankNames = ["1", "2", "3", "4", "5", "6", "7", "8"]
  const pieceNames = ["N", "B", "R", "Q", "K"]
  const miscNames = ["x", "p.s.", "O-O", "O-O-O"]

  const appendShortcut = (shortcut: string) => {
    const { san } = getValues();
    setValue("san", san + shortcut);
  }

  const ShortcutButton = ({shortcut}: {shortcut: string}) => (
    <button
      type="button"
      onClick={() => appendShortcut(shortcut)}
      className="p-2 text-xl border-2 border-purple-500"
    >
      {shortcut}
    </button>
  )

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center items-center gap-2">
      <div className="flex gap-2 items-center flex-wrap">
        <label htmlFor="san" className="text-xl">
          Continuation
        </label>
        <div className="flex gap-2">
          <input
            {...register("san")}
            className="w-24 p-2 text-xl bg-transparent border-2 border-purple-500"
            placeholder="SAN"
            autoComplete="off"
          />
          <button
            type="submit"
            className="p-2 text-xl border-2 border-purple-500"
          >
            Submit
          </button>
          <button
            type="reset"
            className="p-2 text-xl border-2 border-purple-500"
            onClick={() => {
              reset()
              if (onReset) {
                onReset()
              }
            }}
          >
            Reset
          </button>
        </div>
      {
        errors.san ? (
          <span className="text-red-500">{errors.san?.message}</span>
        ) : isWrong ? (
          <span className="text-red-500">Incorrect</span>
        ) : null
      }
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="grid grid-cols-3 gap-2">
          { pieceNames.map((piece) => <ShortcutButton key={piece} shortcut={piece}/> )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          { squareNames.map((square) => <ShortcutButton key={square} shortcut={square}/> )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          { rankNames.map((rank) => <ShortcutButton key={rank} shortcut={rank}/> )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          { miscNames.map((misc) => <ShortcutButton key={misc} shortcut={misc}/> )}
        </div>
      </div>

    </form>

  );
};
