import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  backgroundImage?: string;
}

const PageHeader = ({
  title,
  subtitle,
  children,
  backgroundImage = "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2070&auto=format&fit=crop",
}: PageHeaderProps) => {
  return (
    <div
      className={`relative py-24 md:py-32 ${
        backgroundImage ? "" : "bg-gray-900"
      }`}
    >
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      <div className="relative container px-4 mx-auto text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
