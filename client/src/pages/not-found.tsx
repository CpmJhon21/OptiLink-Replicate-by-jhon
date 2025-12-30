import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg border border-border shadow-2xl max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2 tracking-tight">404</h1>
        <p className="text-muted-foreground mb-8">
          The documentation page you are looking for doesn't exist.
        </p>

        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all w-full">
          Return to Documentation
        </Link>
      </div>
    </div>
  );
}
