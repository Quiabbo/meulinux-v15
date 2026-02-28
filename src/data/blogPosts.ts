export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  tags: string[];
  content: string;
  date: string;
  image: string;
}

export const blogPosts: Record<string, BlogPost[]> = {
  pt: [],
  en: [],
  es: []
};
