import TopBar from '../components/TopBar';

export default function BasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopBar>{children}</TopBar>;
}
