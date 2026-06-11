import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";
import { OptimizedImage } from "./OptimizedImage";

interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
  selected?: boolean;
  onSelect?: () => void;
}

export const BlogCard = ({
  title,
  slug,
  excerpt,
  image,
  author,
  date,
  readTime,
  category,
  selected = false,
  onSelect,
}: BlogCardProps) => {
  const navigate = useNavigate();
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const cardClasses = `group h-full overflow-hidden rounded-lg border transition-shadow ${
    selected
      ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
      : "border-border bg-card hover:shadow-lg"
  }`;

  // make it clearly interactive
  const interactiveCardClasses = `${cardClasses} cursor-pointer`;

  const actionLabel = onSelect ? (selected ? "Selected" : "Select article") : "Read More";

  const content = (
    <>
      <div className="relative h-48 overflow-hidden bg-muted">
        <OptimizedImage
          src={image}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col h-full text-left">
        <h3 className="font-body font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="font-body text-sm text-foreground mb-4 line-clamp-2 flex-grow">
          {excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3 border-t pt-3">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readTime} min read</span>
          </div>
          <span>{formattedDate}</span>
        </div>

        <div className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
          {actionLabel}
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => {
          onSelect();
          navigate(`/blog/${slug}`);
        }}
        aria-pressed={selected}
        title={actionLabel}
        aria-label={`${title} - ${actionLabel}`}
        className={interactiveCardClasses}
      >
        {content}
      </button>
    );
  }

  return (
    <Link to={`/blog/${slug}`} className={`${cardClasses} block`}>
      {content}
    </Link>
  );
};
