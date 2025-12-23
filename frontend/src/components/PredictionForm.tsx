import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Loader2 } from "lucide-react";
import { API_URL } from "@/lib/config";
interface FormData {
  age: string;
  sex: string;
  cp: string;
  trestbps: string;
  chol: string;
  fbs: string;
  restecg: string;
  thalach: string;
  exang: string;
  oldpeak: string;
  slope: string;
  ca: string;
  thal: string;
}

interface PredictionResult {
  prediction: number;
  risk: string;
  confidence: number;
  message: string;
}

interface PredictionFormProps {
  onResult: (result: PredictionResult | null) => void;
}

const PredictionForm = ({ onResult }: PredictionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onResult(null);

    const payload = {
      age: Number(formData.age),
      sex: Number(formData.sex),
      cp: Number(formData.cp),
      trestbps: Number(formData.trestbps),
      chol: Number(formData.chol),
      fbs: Number(formData.fbs),
      restecg: Number(formData.restecg),
      thalach: Number(formData.thalach),
      exang: Number(formData.exang),
      oldpeak: Number(formData.oldpeak),
      slope: Number(formData.slope),
      ca: Number(formData.ca),
      thal: Number(formData.thal),
    };

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Prediction error", err);
      onResult({
        prediction: -1,
        risk: "Error",
        confidence: 0,
        message: "Error occurred during prediction",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-xl bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
          <div className="p-2 rounded-xl bg-primary/10">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Demographics */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Demographics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 55"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  required
                  min="1"
                  max="120"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sex">Sex</Label>
                <Select
                  value={formData.sex}
                  onValueChange={(value) => handleInputChange("sex", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Male</SelectItem>
                    <SelectItem value="0">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Symptoms & Pain
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cp">Chest Pain Type</Label>
                <Select
                  value={formData.cp}
                  onValueChange={(value) => handleInputChange("cp", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select chest pain type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Typical Angina</SelectItem>
                    <SelectItem value="1">Atypical Angina</SelectItem>
                    <SelectItem value="2">Non-anginal Pain</SelectItem>
                    <SelectItem value="3">Asymptomatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="exang">Exercise Induced Angina</Label>
                <Select
                  value={formData.exang}
                  onValueChange={(value) => handleInputChange("exang", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Yes</SelectItem>
                    <SelectItem value="0">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Vital Signs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trestbps">Resting Blood Pressure (mm Hg)</Label>
                <Input
                  id="trestbps"
                  type="number"
                  placeholder="e.g., 120"
                  value={formData.trestbps}
                  onChange={(e) => handleInputChange("trestbps", e.target.value)}
                  required
                  min="80"
                  max="250"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chol">Cholesterol (mg/dl)</Label>
                <Input
                  id="chol"
                  type="number"
                  placeholder="e.g., 200"
                  value={formData.chol}
                  onChange={(e) => handleInputChange("chol", e.target.value)}
                  required
                  min="100"
                  max="600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thalach">Max Heart Rate Achieved</Label>
                <Input
                  id="thalach"
                  type="number"
                  placeholder="e.g., 150"
                  value={formData.thalach}
                  onChange={(e) => handleInputChange("thalach", e.target.value)}
                  required
                  min="60"
                  max="250"
                />
              </div>
            </div>
          </div>

          {/* Blood Tests */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Blood Tests & ECG
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fbs">Fasting Blood Sugar &gt; 120 mg/dl</Label>
                <Select
                  value={formData.fbs}
                  onValueChange={(value) => handleInputChange("fbs", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">True</SelectItem>
                    <SelectItem value="0">False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="restecg">Resting ECG Results</Label>
                <Select
                  value={formData.restecg}
                  onValueChange={(value) => handleInputChange("restecg", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ECG result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Normal</SelectItem>
                    <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                    <SelectItem value="2">Left Ventricular Hypertrophy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Advanced Metrics */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Advanced Cardiac Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="oldpeak">ST Depression (Oldpeak)</Label>
                <Input
                  id="oldpeak"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 1.5"
                  value={formData.oldpeak}
                  onChange={(e) => handleInputChange("oldpeak", e.target.value)}
                  required
                  min="0"
                  max="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slope">ST Slope</Label>
                <Select
                  value={formData.slope}
                  onValueChange={(value) => handleInputChange("slope", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select slope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Upsloping</SelectItem>
                    <SelectItem value="1">Flat</SelectItem>
                    <SelectItem value="2">Downsloping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ca">Number of Major Vessels</Label>
                <Select
                  value={formData.ca}
                  onValueChange={(value) => handleInputChange("ca", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vessels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="thal">Thalassemia</Label>
                <Select
                  value={formData.thal}
                  onValueChange={(value) => handleInputChange("thal", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Normal</SelectItem>
                    <SelectItem value="2">Fixed Defect</SelectItem>
                    <SelectItem value="3">Reversible Defect</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full text-lg font-semibold py-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-5 w-5" />
                Predict Heart Disease Risk
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;
