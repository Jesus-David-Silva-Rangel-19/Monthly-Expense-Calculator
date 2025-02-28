
import React from "react";
import { Heart, Rocket } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center text-sm text-muted-foreground mt-8">
      <p className="flex items-center justify-center gap-1">
        Creado con <Heart className="h-4 w-4 text-red-500 fill-red-500" /> por Jesus David Silva Rangel <Rocket className="h-4 w-4 text-blue-500" />
      </p>
    </footer>
  );
};

export default Footer;
