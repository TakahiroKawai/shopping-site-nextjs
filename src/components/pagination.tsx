"use client";

import { useRouter } from "next/navigation";
import { PaginationButton } from "./paginationbutton";

export default function Pagination({ currentPage, totalPages, limit }: {
  currentPage: number;
  totalPages: number;
  limit: number;
}) {
  const router = useRouter();

  const goToPage = (page: number, limit: number) => {
    router.push(`/?page=${page}&limit=${limit}`);
  };

  return (
    <div className="flex gap-2 justify-center mt-6">
      <PaginationButton page={currentPage - 1} label="前へ" disabled={currentPage === 1} />
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => goToPage(i + 1, limit)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          {i + 1}
        </button>
      ))}
      <PaginationButton page={currentPage + 1} label="次へ" disabled={currentPage === totalPages} />
    </div>
  );
}
