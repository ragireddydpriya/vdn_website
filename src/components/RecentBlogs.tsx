import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "./BlogCard";
import blogsData from "@/data/blogs.json";

export const RecentBlogs = () => {
  // Get the 3 most recent blogs
  const recentBlogs = [...blogsData.blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section id="blogs" className="py-16 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="container-wide mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Garden & Plant Tips
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover expert advice on plant care, gardening techniques, and landscaping trends
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>

        {/* View All Link */}
        <div className="flex justify-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
