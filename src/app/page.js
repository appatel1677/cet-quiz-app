import Link from 'next/link';

export default function Home() {
  const list = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="min-h-screen bg-indigo-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-indigo-900 my-8">
        📚 CET Anubhav Kasoti(palaj) (1 thi 7)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        {list.map((num) => (
          <Link
            key={num}
            href={`/quiz/${num}`}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition border border-indigo-100 flex justify-between items-center group"
          >
            <span className="text-xl font-bold text-gray-800 group-hover:text-indigo-600">
              Anubhav Kasoti - {num}
            </span>
            <span className="text-2xl">➔</span>
          </Link>
        ))}
      </div>
    </div>
  );
}