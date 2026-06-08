import LocationSelector from "@/shared/ui/LocationSelector/LocationSelector";

interface PreOnboardingData {
  startupLocation: string;
}

interface PreOnboardingProps {
  onSubmit?: (data: PreOnboardingData) => void;
}

const PreOnboarding = ({ onSubmit }: PreOnboardingProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="font-pt-body2-medium text-hub-black-1">창업 위치</p>
      <LocationSelector
        onChange={(location) => onSubmit?.({ startupLocation: location })}
      />
    </div>
  );
};

export default PreOnboarding;
