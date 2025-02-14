"use client";

interface PageProps {
  title: string;
  emphasisText: string;
  inverted: boolean;
}

export default function PageTitle({ title, emphasisText, inverted}: PageProps) {
  return inverted ? (
    <h1 className="font-extrabold mb-12">
      {emphasisText && <span className="text-7xl rainbow-text">{emphasisText}</span>}

      {title && (
        <span className="text-5xl">
          <br />
          {title}
        </span>
      )}
    </h1>
  ) : (
    <h1 className="font-extrabold mb-12">
      {title && (
        <span className="text-7xl">
          {title}
        </span>
      )}
    
      {emphasisText && <span className="text-5xl rainbow-text"><br />{emphasisText}</span>}

    </h1>

  );
}
