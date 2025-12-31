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
                <p className="text-xs text-muted-foreground">
                  Machine Learning–Based Heart Disease Risk Assessment
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Privacy-focused design</span>
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
              <span className="text-sm font-medium text-primary">
                Trained Machine Learning Classification Model
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Predict Heart Disease Risk with{" "}
              <span className="text-primary">Data-Driven Insights</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter standard clinical parameters to receive an instant heart disease
              risk assessment using a trained machine learning model.
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
                <h3 className="font-semibold text-foreground">Real-time Prediction</h3>
                <p className="text-sm text-muted-foreground">
                  Model inference completed within seconds
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Stethoscope className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Clinically Relevant Features</h3>
                <p className="text-sm text-muted-foreground">
                  Based on validated cardiovascular datasets
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Privacy-Focused</h3>
                <p className="text-sm text-muted-foreground">
                  No patient data is stored or logged
                </p>
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
              <strong className="text-foreground">Medical Disclaimer:</strong> This
              application is intended for educational and research purposes only.
              The predictions generated by this system should not be interpreted as
              medical advice or a clinical diagnosis. Always consult a qualified
              healthcare professional for medical decisions.
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
              © {new Date().getFullYear()} HeartGuard. Academic Machine Learning Project.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
