import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import blogsData from "@/data/blogs.json";

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get unique categories
  const categories = Array.from(
    new Set(blogsData.blogs.map((blog) => blog.category))
  );

  const sortedBlogs = [...blogsData.blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredBlogs = selectedCategory
    ? sortedBlogs.filter((blog) => blog.category === selectedCategory)
    : sortedBlogs;

  const selectedBlog = selectedBlogId
    ? sortedBlogs.find((blog) => blog.id === selectedBlogId) ?? null
    : null;

  useEffect(() => {
    if (
      selectedBlogId &&
      selectedBlog &&
      selectedCategory &&
      selectedBlog.category !== selectedCategory
    ) {
      setSelectedBlogId(null);
    }
  }, [selectedCategory, selectedBlogId, selectedBlog]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <div className="container-wide mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Garden & Plant Tips
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover expert gardening advice, plant care guides, and landscaping inspiration
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container-wide mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              All Articles
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-12">
        <div className="container-wide mx-auto px-4 lg:px-8">
          {filteredBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    {...blog}
                    selected={selectedBlogId === blog.id}
                    onSelect={() => setSelectedBlogId(blog.id)}
                  />
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  type="button"
                  disabled={!selectedBlog}
                  onClick={() => selectedBlog && navigate(`/blog/${selectedBlog.slug}`)}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    selectedBlog
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Read Selected Article
                </button>
                <p className="text-sm text-muted-foreground mt-3">
                  {selectedBlog
                    ? `Selected: ${selectedBlog.title}`
                    : "Select a blog card above to open your preferred article."}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
