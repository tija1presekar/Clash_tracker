import TopBar from '../components/TopBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopBar>{children}</TopBar>;
}
