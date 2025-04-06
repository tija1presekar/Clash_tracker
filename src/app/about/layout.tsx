import TopBar from '../components/TopBar';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopBar>{children}</TopBar>;
}
