import TopBar from '../components/TopBar';

export default function ClanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopBar>{children}</TopBar>;
}
