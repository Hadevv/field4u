"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { UserRole } from "@/generated/client";
import { OnboardingRoleStep } from "./OnboardingRoleStep";
import { OnboardingFarmerForm } from "./OnboardingFarmerForm";
import { OnboardingGleanerForm } from "./OnboardingGleanerForm";
import { OnboardingRulesStep } from "./OnboardingRulesStep";
import { Logo } from "@/components/svg/Logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentStep(2);
  };

  const handleFormSubmit = () => {
    if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-4">
      <div className="mb-8 flex items-center gap-3">
        <Logo />
      </div>

      <div className="mb-4 flex items-center justify-center gap-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-2 w-16 rounded-full ${
              currentStep >= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <Card className="w-full max-w-lg shadow-lg">
        <CardContent className="p-6">
          {currentStep === 1 && (
            <OnboardingRoleStep onSelect={handleRoleSelect} />
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="mb-4 text-sm text-muted-foreground hover:underline"
              >
                ← Changer de rôle
              </button>

              <Alert className="mb-4">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Après cette étape, vous devrez accepter les règles de conduite
                  pour finaliser votre inscription.
                </AlertDescription>
              </Alert>

              {selectedRole === "FARMER" ? (
                <OnboardingFarmerForm onSubmit={handleFormSubmit} />
              ) : (
                <OnboardingGleanerForm onSubmit={handleFormSubmit} />
              )}
            </div>
          )}

          {currentStep === 3 && selectedRole && (
            <div className="space-y-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="mb-4 text-sm text-muted-foreground hover:underline"
              >
                ← Retour au formulaire
              </button>
              <OnboardingRulesStep role={selectedRole} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
