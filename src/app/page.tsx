import { LinkedInTransformer } from "@/components/LinkedInTransformer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-blue-100 dark:selection:bg-blue-900/40">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] dark:bg-blue-600/10"></div>
        <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-indigo-500/5 rounded-full blur-[100px] dark:bg-indigo-600/10"></div>
        <div className="absolute -bottom-[50px] left-[10%] w-[30%] h-[30%] bg-sky-500/5 rounded-full blur-[100px] dark:bg-sky-600/10"></div>
      </div>

      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-lg shadow-sm">
              In
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">
              Transformer
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/sameer9860/Linkedin-transformer.git" 
              target="_blank" 
              className="text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="pb-24 pt-8">
        <LinkedInTransformer />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Built with Next.js, Tailwind CSS & AI for modern professionals.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-600">
            © 2026 LinkedIn Transformer. No data is stored.
          </p>
        </div>
      </footer>
    </div>
  );
}
