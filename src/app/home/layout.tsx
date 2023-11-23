import Navbar from "@/components/Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      {children}
    </main>
  );
}
