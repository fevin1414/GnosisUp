import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  title: string;
  value?: string | number;
  progress?: number;
  footer?: React.ReactNode;
}

export function StatCard({ title, value, progress, footer }: StatCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900 space-y-2">
      <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">
        {title}
      </h3>
      {typeof value !== "undefined" && (
        <p className="text-2xl font-bold text-foreground">{value}</p>
      )}
      {typeof progress === "number" && (
        <Progress value={progress} className="h-2 mt-2" />
      )}
      {footer && (
        <div className="text-xs text-muted-foreground mt-2">{footer}</div>
      )}
    </div>
  );
}
