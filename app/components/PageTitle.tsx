interface PageProps {
    title: string;
    emphasisText: string;
}

export default function PageTitle({title, emphasisText}: PageProps) {
  return (
    <h1 className="text-7xl font-extrabold mb-12">
      {title ?? "Page Title"}
      {emphasisText && (
        <span className="rainbow-text">
          <br />
          {emphasisText}
        </span>
      )}
    </h1>
  );
}
