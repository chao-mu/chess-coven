// React Hook Form
import { useForm } from "react-hook-form";

// chess.js
import { Chess } from "chess.js";

type PgnLoaderProps = {
  onPgnLoaded: (pgn: string) => void;
};

type FormValues = {
  pgn: string;
};

export const PgnLoader = ({ onPgnLoaded }: PgnLoaderProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const validatePgn = (pgn: string) => {
    const chess = new Chess();
    try {
      chess.loadPgn(pgn);
      return true;
    } catch (e) {
      return "Invalid PGN";
    }
  };

  return (
    <form
      onSubmit={handleSubmit(({ pgn }) => onPgnLoaded(pgn))}
      className="flex flex-col items-start"
    >
      <textarea
        {...register("pgn", { required: true, validate: validatePgn })}
        className="rounded-lg border border-gray-300 p-2"
        placeholder="Enter PGN"
        autoComplete="off"
      />
      <button
        type="submit"
        className="mr-2 mt-2 rounded-lg bg-lime-500 p-2 text-white hover:bg-lime-600"
      >
        Submit
      </button>
      {errors.pgn && (
        <span className="text-red-500">{errors.pgn?.message}</span>
      )}
    </form>
  );
};
