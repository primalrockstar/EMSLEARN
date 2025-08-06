import React from "react";
import { Card, CardHeader, CardFooter, Button } from "../ui/Card";

type ModuleCardProps = {
  progress: number;
};

const ModuleCard: React.FC<ModuleCardProps> = ({ progress }) => (
  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
    <CardHeader>
      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium">
        {/* Some header text */}
      </span>
      <div>
        {/* More CardHeader content */}
      </div>
    </CardHeader>
    <div>
      {/* ModuleCard body */}
      <div style={{ width: `${progress}%` }} />
    </div>
    <CardFooter>
      <Button>{/* Button text */}</Button>
    </CardFooter>
  </Card>
);

export default ModuleCard;