import { useState } from "react";
import { Heart, Activity, Shield, Stethoscope } from "lucide-react";
import PredictionForm from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";

interface PredictionResultData {
  prediction: number;
  risk: string;
  confidence: number;
  message: string;
}

const Index = () => {
  const [result, setResult] = useState<PredictionResultData | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">HeartGuard</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Heart Disease Prediction</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/30" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Advanced ML Prediction Model</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Predict Heart Disease Risk with{" "}
              <span className="text-primary">AI Precision</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter patient clinical data to receive an instant risk assessment powered by machine learning algorithms trained on extensive cardiovascular datasets.
            </p>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="border-y border-border bg-card/30">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Real-time Analysis</h3>
                <p className="text-sm text-muted-foreground">Instant predictions in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Stethoscope className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Clinical Accuracy</h3>
                <p className="text-sm text-muted-foreground">Based on validated datasets</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">Data never stored on servers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <PredictionForm onResult={setResult} />
          
          {result && (
            <div className="mt-8">
              <PredictionResult result={result} />
            </div>
          )}
        </div>
      </main>

      {/* Disclaimer */}
      <section className="border-t border-border bg-card/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Medical Disclaimer:</strong> This tool is for educational and informational purposes only. 
              It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">HeartGuard</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HeartGuard. Built with care for better health outcomes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
