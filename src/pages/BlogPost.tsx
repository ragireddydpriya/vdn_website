import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OptimizedImage } from "@/components/OptimizedImage";
import blogsData from "@/data/blogs.json";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const blog = blogsData.blogs.find((b) => b.slug === slug);

  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedBlogs = blogsData.blogs
    .filter(
      (b) => b.category === blog.category && b.id !== blog.id
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-24 pb-6 border-b border-border bg-muted/30">
        <div className="container-wide mx-auto px-4 lg:px-8">
          <button
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </button>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-8">
        <div className="container-wide mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {blog.category}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <span>{formattedDate}</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime} min read</span>
              </div>
              <button
                onClick={handleShare}
                className="ml-auto inline-flex items-center gap-2 px-3 py-1 hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mb-12">
        <div className="container-wide mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <OptimizedImage
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container-wide mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-sm md:prose-base max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold mt-8 mb-4 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-foreground/90 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="mb-2 text-foreground/90">{children}</li>
                  ),
                  code: ({ inline, children }) =>
                    inline ? (
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                        <code className="text-sm font-mono">{children}</code>
                      </pre>
                    ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic text-foreground/70">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 border-t border-border">
          <div className="container-wide mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  to={`/blog/${relatedBlog.slug}`}
                  className="group block rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40 overflow-hidden bg-muted">
                    <OptimizedImage
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {relatedBlog.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
