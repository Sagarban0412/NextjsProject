import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const FeatureCard = ({icon, title, description}) => {
  return (
    <>
      <Card className="text-center hover:shadow-lg transition-shadow min-h-[300px]">
        <CardHeader>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">{icon}</span>
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};

export default FeatureCard;
