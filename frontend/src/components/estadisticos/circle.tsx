import React, { useMemo, useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "../ui/button";

// Configuración de colores
const chartConfig = {
  Votos: {
    label: "Votos",
  },
} satisfies ChartConfig;

// Componente actualizado para recibir datos dinámicos
interface CircleDataProps {
  data: { nombre: string; Votos: number; fill: string }[];
}

export function CircleData({ data }: CircleDataProps) {
  const [showTopThree, setShowTopThree] = useState(true);

  const filteredData = useMemo(() => {
    if (showTopThree) {
      return [...data].sort((a, b) => b.Votos - a.Votos).slice(0, 5);
    }
    return data;
  }, [data, showTopThree]);

  const totalVotos = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.Votos, 0);
  }, [filteredData]);

  return (
    <Card className="flex flex-col w-96">
      <CardHeader className="items-center pb-0">
        <CardTitle>Obras más votadas</CardTitle>
        <Button onClick={() => setShowTopThree(!showTopThree)}>
          {showTopThree ? "Ver todas las obras " : "Ver top 5 "}
        </Button>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={filteredData}
              dataKey="Votos"
              nameKey="nombre"
              innerRadius={60}
              strokeWidth={6}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVotos.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Votos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
