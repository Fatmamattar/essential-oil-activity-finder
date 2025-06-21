
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, ArrowLeft, Download, RefreshCw, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PredictionResult {
  label: string;
  confidence: number;
}

interface ResultsData {
  predictions: PredictionResult[];
  inputData: Record<string, number[]>;
}

const Results = () => {
  const [results, setResults] = useState<ResultsData | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('predictionResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h2>
            <p className="text-gray-600 mb-6">Please run a prediction first to see results.</p>
            <Link to="/predict">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Go to Prediction
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "bg-emerald-500";
    if (confidence >= 50) return "bg-yellow-500";
    return "bg-gray-400";
  };

  const getInterpretation = (predictions: PredictionResult[]) => {
    const highConfidence = predictions.filter(p => p.confidence >= 70);
    const mediumConfidence = predictions.filter(p => p.confidence >= 50 && p.confidence < 70);
    
    if (highConfidence.length === 0 && mediumConfidence.length === 0) {
      return {
        summary: "Low Activity Profile",
        description: "The model predicts low biological activity across all tested categories. This essential oil may have limited therapeutic applications based on the analyzed properties.",
        recommendation: "Consider testing with different extraction methods or exploring other biological activities not covered in this model."
      };
    }
    
    if (highConfidence.length > 0) {
      return {
        summary: "Strong Activity Profile",
        description: `The model shows high confidence (≥70%) for ${highConfidence.map(p => p.label).join(', ')} activities. This suggests significant therapeutic potential.`,
        recommendation: "These results indicate promising biological activities. Consider further laboratory validation and exploration of therapeutic applications."
      };
    }
    
    return {
      summary: "Moderate Activity Profile", 
      description: `The model shows moderate confidence for ${mediumConfidence.map(p => p.label).join(', ')} activities.`,
      recommendation: "Results suggest potential biological activities that warrant further investigation through experimental validation."
    };
  };

  const interpretation = getInterpretation(results.predictions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">EssentialAI</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Home</Link>
              <Link to="/predict" className="text-gray-700 hover:text-emerald-600 transition-colors">Predict</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/predict" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Prediction
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Prediction Results
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered analysis of your essential oil's biological activities based on chemical properties
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Results Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prediction Results */}
            <Card className="border-emerald-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-100">
                <CardTitle className="flex items-center text-2xl text-gray-900">
                  <TrendingUp className="h-6 w-6 mr-3 text-emerald-600" />
                  Biological Activity Predictions
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-6">
                  {results.predictions.map((prediction, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="capitalize">
                            {prediction.label}
                          </Badge>
                          <span className="font-medium text-gray-700">
                            {prediction.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      
                      <Progress 
                        value={prediction.confidence} 
                        className="h-3"
                        style={{
                          background: `linear-gradient(to right, ${getConfidenceColor(prediction.confidence)} 0%, ${getConfidenceColor(prediction.confidence)} ${prediction.confidence}%, #e5e7eb ${prediction.confidence}%, #e5e7eb 100%)`
                        }}
                      />
                      
                      <p className="text-sm text-gray-600">
                        {prediction.confidence >= 70 ? "High confidence - Strong indication of activity" :
                         prediction.confidence >= 50 ? "Moderate confidence - Potential activity" :
                         "Low confidence - Limited indication of activity"}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/predict" className="flex-1">
                <Button variant="outline" size="lg" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Prediction
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  const dataStr = JSON.stringify(results, null, 2);
                  const dataBlob = new Blob([dataStr], {type: 'application/json'});
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'prediction_results.json';
                  link.click();
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Results
              </Button>
            </div>
          </div>

          {/* Interpretation Sidebar */}
          <div className="space-y-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Results Interpretation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {interpretation.summary}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {interpretation.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Recommendation
                  </h4>
                  <p className="text-sm text-gray-600">
                    {interpretation.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Confidence Levels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span className="text-sm text-gray-600">≥70% - High Confidence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-gray-600">50-69% - Moderate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span className="text-sm text-gray-600">&lt;50% - Low Confidence</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  These predictions are based on machine learning models and should be validated 
                  through experimental research before any practical applications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
