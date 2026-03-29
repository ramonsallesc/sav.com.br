import BackgroundDecoration from "./BackgroundDecoration";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Classes extras no container central */
  className?: string;
}

/**
 * Layout padrão de todas as páginas:
 * - Decoração lateral fixa
 * - Conteúdo centralizado em coluna estreita (mobile-first)
 */
const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className="relative min-h-screen bg-background">
      <BackgroundDecoration />
      <div
        className={`relative z-10 mx-auto flex min-h-screen max-w-sm flex-col items-center px-6 py-10 md:max-w-md ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
