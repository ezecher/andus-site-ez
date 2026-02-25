/**
 * Render body text with a bold phrase highlighted.
 */
export default function BodyWithBold({
  text,
  boldPhrase,
}: {
  text: string;
  boldPhrase?: string;
}) {
  if (!boldPhrase || !text.includes(boldPhrase)) return <>{text}</>;
  const parts = text.split(boldPhrase);
  return (
    <>
      {parts[0]}
      <strong>{boldPhrase}</strong>
      {parts[1]}
    </>
  );
}
