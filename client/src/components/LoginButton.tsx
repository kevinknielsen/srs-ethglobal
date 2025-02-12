import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <Button 
      variant="outline"
      className="bg-[#8B0000] text-white hover:bg-[#6B0000]"
    >
      Sign In
    </Button>
  );
}