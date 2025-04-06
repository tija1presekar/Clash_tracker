import TopBar from '../components/TopBar';

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopBar>{children}</TopBar>;
}
