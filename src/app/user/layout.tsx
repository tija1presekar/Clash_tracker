import TopBar from '../components/TopBar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopBar>{children}</TopBar>;
}
