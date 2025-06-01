"use client";

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
}

export function ProgressIndicator({ steps }: ProgressIndicatorProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step.completed 
                ? "bg-green-500 text-white" 
                : step.current 
                ? "bg-blue-500 text-white" 
                : "bg-gray-200 text-gray-500"
            }`}>
              {step.completed ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            
            {/* Step Content */}
            <div className="ml-4 flex-1">
              <div className={`text-sm font-medium ${
                step.completed || step.current ? "text-gray-900" : "text-gray-500"
              }`}>
                {step.title}
              </div>
              <div className={`text-xs ${
                step.completed || step.current ? "text-gray-600" : "text-gray-400"
              }`}>
                {step.description}
              </div>
            </div>
            
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className={`absolute left-5 mt-10 w-0.5 h-4 ${
                steps[index + 1].completed || steps[index + 1].current ? "bg-green-500" : "bg-gray-200"
              }`} style={{ marginLeft: "20px" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 