export default function CardNote({
  title,
  content,
  description,
  tags,
}: {
  title: string;
  content: string;
  description: string;
  tags: string;
}) {
  return (
    <div className="border-2 border-zinc-500 p-2 rounded-lg dark:border-white">
      <h1 className="text-xl font-bold">{title}</h1>
      <h2>{description}</h2>
      <p>{content}</p>
      <hr className="border-[1px] mt-2 border-zinc-400 dark:border-white" />
      <footer>
        <p>{tags}</p>
      </footer>
    </div>
  );
}
