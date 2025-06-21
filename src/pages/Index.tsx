
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Target, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Target className="h-4 w-4" />
              <span>AI-Powered Biological Activity Prediction</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Essential Oil
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                {" "}Biological Activity
              </span>
              <br />Predictor
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Leverage advanced machine learning to predict the biological activities of essential oils. 
              Our CatBoost-powered model analyzes multiple chemical properties to provide accurate, 
              science-backed predictions for research and development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/predict">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl">
                  Start Prediction
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-xl">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-300"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Predictor?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge machine learning and validated on comprehensive datasets
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-emerald-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">High Accuracy</h3>
                <p className="text-gray-600">
                  Advanced CatBoost algorithm with optimized thresholds achieving superior F1-scores 
                  for reliable biological activity predictions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Label Classification</h3>
                <p className="text-gray-600">
                  Simultaneously predict multiple biological activities with confidence scores, 
                  providing comprehensive insights for your research.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-purple-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Scientific Foundation</h3>
                <p className="text-gray-600">
                  Based on validated datasets with proper preprocessing, feature scaling, 
                  and balanced sampling for robust predictions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Predict Biological Activities?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Enter your essential oil's chemical properties and get instant AI-powered predictions
          </p>
          <Link to="/predict">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 px-8 py-3 rounded-xl">
              Start Your Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-emerald-400" />
            <span className="text-lg font-semibold">EssentialAI</span>
          </div>
          <p className="text-gray-400">
            Advanced machine learning for essential oil biological activity prediction
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
