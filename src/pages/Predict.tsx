
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Leaf, ArrowLeft, Calculator } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Predict = () => {
  const navigate = useNavigate();
  
  // Input fields based on your model's top 10 features
  const inputFields = [
    "Chemical Property 1",
    "Chemical Property 2", 
    "Chemical Property 3",
    "Chemical Property 4",
    "Chemical Property 5",
    "Chemical Property 6",
    "Chemical Property 7",
    "Chemical Property 8",
    "Chemical Property 9",
    "Chemical Property 10"
  ];

  const [inputValues, setInputValues] = useState(
    inputFields.reduce((acc, field) => ({ ...acc, [field]: [0] }), {})
  );

  const handleSliderChange = (field: string, value: number[]) => {
    setInputValues(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = () => {
    // Simulate prediction results and navigate to results page
    const results = {
      predictions: [
        { label: "antimicrobial", confidence: 85.6 },
        { label: "antioxidant", confidence: 72.3 },
        { label: "anti-inflammatory", confidence: 68.9 },
        { label: "antifungal", confidence: 45.2 },
        { label: "analgesic", confidence: 32.1 }
      ],
      inputData: inputValues
    };
    
    // Store results in sessionStorage to pass to results page
    sessionStorage.setItem('predictionResults', JSON.stringify(results));
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">EO Biological Activity Finder</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Home</Link>
              <Link to="/predict" className="text-emerald-600 font-medium">Predict</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Biological Activity Prediction
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter the chemical properties of your essential oil to predict its biological activities. 
            Adjust the sliders below to match your compound's characteristics.
          </p>
        </div>

        {/* Input Form */}
        <Card className="border-emerald-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-100">
            <CardTitle className="flex items-center text-2xl text-gray-900">
              <Calculator className="h-6 w-6 mr-3 text-emerald-600" />
              Chemical Properties Input
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid gap-8">
              {inputFields.map((field, index) => (
                <div key={field} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={field} className="text-sm font-medium text-gray-700">
                      {field}
                    </Label>
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {inputValues[field][0].toFixed(1)}
                    </span>
                  </div>
                  
                  <Slider
                    id={field}
                    min={0}
                    max={10}
                    step={0.1}
                    value={inputValues[field]}
                    onValueChange={(value) => handleSliderChange(field, value)}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0.0</span>
                    <span>5.0</span>
                    <span>10.0</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handlePredict}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl"
              >
                Predict Activities
                <Calculator className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const resetValues = inputFields.reduce((acc, field) => ({ ...acc, [field]: [0] }), {});
                  setInputValues(resetValues);
                }}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-xl"
              >
                Reset Values
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Information Panel */}
        <Card className="mt-8 border-blue-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              How to Use This Predictor
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>• Adjust each slider to match your essential oil's chemical properties</p>
              <p>• Values range from 0.0 to 10.0 representing normalized chemical characteristics</p>
              <p>• Click "Predict Activities" to generate predictions</p>
              <p>• Results will show confidence scores for various biological activities</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Predict;
