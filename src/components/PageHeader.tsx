
interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
}
