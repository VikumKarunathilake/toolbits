export const SyntaxHighlight = ({ code }: { code: string }) => {
  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const html = code.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = 'text-chart-2'; // string
      let content = match;

      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-primary font-semibold'; // key
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-chart-1 font-bold'; // boolean
      } else if (/null/.test(match)) {
        cls = 'text-destructive font-bold'; // null
      } else {
        cls = 'text-chart-5'; // number
      }
      return `<span class="${cls}">${escapeHtml(content)}</span>`;
    }
  );
  return <pre className="font-mono text-sm whitespace-pre-wrap break-all" dangerouslySetInnerHTML={{ __html: html }} />;
};
