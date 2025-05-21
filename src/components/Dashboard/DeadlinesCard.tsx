import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface Deadline {
  title: string;
  dueIn: string;
}

const upcomingDeadlines: Deadline[] = [
  { title: "Math Quiz", dueIn: "in 2 days" },
  { title: "Science Assignment", dueIn: "due tomorrow" },
  { title: "English Presentation", dueIn: "next Monday" },
];

export default function DeadlinesCard() {
  return (
    <Card className="border rounded-lg p-4 shadow-sm  bg-background  border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {upcomingDeadlines.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{item.title}</span>
            <span className="text-muted-foreground">{item.dueIn}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
