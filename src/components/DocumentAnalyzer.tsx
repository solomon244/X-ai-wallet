import { useState, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"

type AnalysisStatus = 'idle' | 'analyzing' | 'success' | 'error';

export default function DocumentAnalyzer() {
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    // Simulate document analysis
    simulateAnalysis();
    stopCamera();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate document analysis
      simulateAnalysis();
    }
  };

  const simulateAnalysis = () => {
    setAnalysisStatus('analyzing');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalysisStatus('success');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Document Analyzer</h2>
        <p className="text-muted-foreground">
          Upload or capture documents for authentication and analysis
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            {!isCameraActive ? (
              <Button onClick={startCamera} className="flex-1">
                <Camera className="mr-2 h-4 w-4" />
                Start Camera
              </Button>
            ) : (
              <Button onClick={captureImage} variant="default" className="flex-1">
                Capture & Analyze
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
            <FileText className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              Drag & drop your document here or click to browse
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,.pdf"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </div>
      </div>

      {analysisStatus !== 'idle' && (
        <div className="space-y-4">
          <Progress value={progress} />
          
          {analysisStatus === 'analyzing' && (
            <Alert>
              <AlertTitle>Analyzing document...</AlertTitle>
              <AlertDescription>
                Please wait while we process and authenticate your document.
              </AlertDescription>
            </Alert>
          )}

          {analysisStatus === 'success' && (
            <Alert variant="default" className="border-green-500 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Document Verified</AlertTitle>
              <AlertDescription>
                Your document has been successfully authenticated and analyzed.
              </AlertDescription>
            </Alert>
          )}

          {analysisStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Failed</AlertTitle>
              <AlertDescription>
                We couldn't verify this document. Please try again with a clearer image.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </Card>
  );
}