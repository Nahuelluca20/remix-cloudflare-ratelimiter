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
    <div>
      <h1 className="text-xl font-bold">{title}</h1>
      <h2>{description}</h2>
      <p>{content}</p>
      <footer>
        <p>{tags}</p>
      </footer>
    </div>
  );
}
