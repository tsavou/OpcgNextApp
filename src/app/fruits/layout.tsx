export default function FruitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto bg-amber-100 px-4 py-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">🍎 Fruits</h1>
      </div>
      {children}
    </div>
  );
}
