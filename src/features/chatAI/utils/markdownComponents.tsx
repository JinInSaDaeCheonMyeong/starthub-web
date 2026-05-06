import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-hub-primary underline hover:text-blue-600"
      onClick={(e) => {
        e.preventDefault();
        if (href) window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <table className="w-full border-collapse my-2 text-xs">{children}</table>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children, node }) => {
    const isHeader = node?.position && node.position.start.line === 1;
    return <tr className={!isHeader ? "even:bg-gray-50" : ""}>{children}</tr>;
  },
  th: ({ children }) => (
    <th className="border border-hub-gray-3 px-2 py-1.5 text-left align-top font-bold bg-blue-50 text-hub-black-2 break-words">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-hub-gray-3 px-2 py-1.5 text-left align-top break-words">
      {children}
    </td>
  ),
  h1: ({ children }) => (
    <h1 className="font-bold text-2xl my-3.5 leading-tight first:mt-0 block">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-bold text-xl my-3 leading-tight first:mt-0 block">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-bold text-lg my-2.5 leading-tight first:mt-0 block">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-bold text-base my-1 leading-tight first:mt-0 block">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-1.5 last:mb-0 text-sm lg:text-base">{children}</p>
  ),
  ul: ({ children }) => <ul className="my-1 pl-5 list-disc">{children}</ul>,
  ol: ({ children }) => <ol className="my-1 pl-5 list-decimal">{children}</ol>,
  li: ({ children }) => <li className="my-0.5">{children}</li>,
  code: ({ children, inline }) =>
    inline ? (
      <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">
        {children}
      </code>
    ) : (
      <code className="block bg-blue-50 rounded-lg px-3 py-2.5 overflow-x-auto my-1.5 text-xs font-mono">
        {children}
      </code>
    ),
  pre: ({ children }) => (
    <pre className="bg-blue-50 rounded-lg px-3 py-2.5 overflow-x-auto my-1.5">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-hub-primary my-1.5 pl-3 text-hub-gray-2">
      {children}
    </blockquote>
  ),
  hr: ({}) => <hr className="border-none border-t border-hub-gray-3 my-2" />,
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
};
