import Link from "next/link";

type Props = {
  page: number;
  label: string;
  disabled?: boolean;
};

export const PaginationButton = ({ page, label, disabled }: Props) => {
  return (
    <Link href={`/?page=${page}`} className={`px-4 py-2 rounded-md border border-gray-300 ${disabled ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}>
      {label}
    </Link>
  );
};
