import Header from "./_components/header";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
