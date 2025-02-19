
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1 w-full mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
