import { features } from "@/assets/data/HomePage";

import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Featuers = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        return (
          <Card key={index}>
            <CardHeader>
                <feature.icon className="w-12 h-12 text-teal-700 mb-4 mx-auto"></feature.icon>
              <CardTitle className="text-center text-gray-700">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-700">{feature.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Featuers;
