/**
 * Reusable Slug Generator Utility
 * Converts any text/title into a URL-friendly slug.
 * 
 * Examples:
 * generateSlug("Senior React Developer") => "senior-react-developer-x8y9z"
 * generateSlug("AI Mock Interview", { withSuffix: false }) => "ai-mock-interview"
 */

interface SlugOptions {
  withSuffix?: boolean; // শেষে র‍্যান্ডম সাফিক্স যোগ করবে কিনা (ডিফল্ট: true)
  suffixLength?: number; // সাফিক্সের দৈর্ঘ্য (ডিফল্ট: 5)
}

export function generateSlug(text: string, options: SlugOptions = {}): string {
  const { withSuffix = true, suffixLength = 5 } = options;

  if (!text) return "";

  // ১. টেক্সট ছোট হাতের করে স্পেশাল ক্যারেক্টার হাইফেন দিয়ে রিপ্লেস করা
  const baseSlug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // স্পেশাল ক্যারেক্টার বাদ
    .replace(/[\s_-]+/g, "-") // স্পেস ও আন্ডারস্কোর হাইফেনে রূপান্তর
    .replace(/^-+|-+$/g, ""); // শুরুর ও শেষের অতিরিক্ত হাইফেন বাদ

  // ২. যদি ইউনিক সাফিক্সের প্রয়োজন না থাকে
  if (!withSuffix) {
    return baseSlug;
  }

  // ৩. ইউনিক র‍্যান্ডম সাফিক্স জেনারেট করা
  const randomSuffix = Math.random()
    .toString(36)
    .substring(2, 2 + suffixLength);

  return `${baseSlug}-${randomSuffix}`;
}

export default generateSlug;