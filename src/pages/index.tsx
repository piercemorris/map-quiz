import Link from "next/link"

enum quizType {
  regionName,
  regionLocation,
  regionReading,
}

export default function Home() {
  const quizOptions = [
    {
      key: quizType.regionName,
      page: "prefecture",
      title: "Name the prefecture",
      desc: "Type the name of the prefecture that is highlighted",
    },
    {
      key: quizType.regionLocation,
      page: "identify",
      title: "Select the prefecture",
      desc: "Find the prefecture on the map",
    },
    {
      key: quizType.regionReading,
      page: "reading",
      title: "Read the prefecture",
      desc: "Type the reading of the prefecture",
    },
  ]
  return (
    <main>
      <div className="flex h-screen flex-col items-center justify-center gap-5">
        {quizOptions.map((option) => (
          <Link
            key={option.key}
            href={`/quiz/${option.page}`}
            className="flex w-1/3 flex-col rounded-md border border-slate-300 px-4 py-2 hover:bg-fuchsia-600"
          >
            <span className="text-xl font-bold">{option.title}</span>
            <span className="text-sm">{option.desc}</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
