import { Card, CardContent } from "@/components/ui/card";
import { Heart, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictionResult {
  prediction: number;
  risk: string;
  confidence: number;
  message: string;
}

interface PredictionResultProps {
  result: PredictionResult;
}

const PredictionResultComponent = ({ result }: PredictionResultProps) => {
  const isHighRisk = result.risk === "High";
  const isError = result.prediction === -1;

  const getStatusConfig = () => {
    if (isError) {
      return {
        icon: XCircle,
        title: "Error",
        bgClass: "bg-destructive/10",
        borderClass: "border-destructive/20",
        iconClass: "text-destructive",
        textClass: "text-destructive",
      };
    }
    if (isHighRisk) {
      return {
        icon: AlertTriangle,
        title: "High Risk Detected",
        bgClass: "bg-destructive/10",
        borderClass: "border-destructive/30",
        iconClass: "text-destructive",
        textClass: "text-destructive",
      };
    }
    return {
      icon: CheckCircle2,
      title: "Low Risk",
      bgClass: "bg-accent",
      borderClass: "border-primary/20",
      iconClass: "text-primary",
      textClass: "text-primary",
    };
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        "border-2 shadow-xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4",
        config.bgClass,
        config.borderClass
      )}
    >
      <CardContent className="pt-8 pb-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className={cn(
              "p-4 rounded-full",
              isHighRisk ? "bg-destructive/20" : isError ? "bg-destructive/20" : "bg-primary/20"
            )}
          >
            <Icon className={cn("h-12 w-12", config.iconClass)} />
          </div>

          <div className="space-y-2">
            <h2 className={cn("text-3xl font-bold", config.textClass)}>
              {config.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              {result.message}
            </p>
          </div>

          {!isError && (
            <div className="mt-4 px-6 py-3 rounded-full bg-card border border-border">
              <span className="text-sm text-muted-foreground">
                Model Confidence:{" "}
                <span className="font-semibold text-foreground">
                  {result.confidence}%
                </span>
              </span>
            </div>
          )}

          {!isError && (
            <div className="mt-6 p-4 rounded-xl bg-card border border-border max-w-md">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground text-left">
                  {isHighRisk
                    ? "This prediction suggests elevated cardiovascular risk. Please consult with a healthcare professional for proper evaluation and personalized medical advice."
                    : "While the prediction indicates lower risk, maintaining a healthy lifestyle and regular check-ups with your healthcare provider is recommended."}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResultComponent;
