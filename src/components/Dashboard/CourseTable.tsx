import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export interface CourseData {
  id: string;
  name: string;
  lessonsCompleted?: number;
  totalLessons?: number;
  studentsEnrolled?: number;
  price: string;
  actions?: boolean;
}

interface CourseTableProps {
  columns: string[];
  data: CourseData[];
  isTeacher?: boolean;
  onAdd?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function CourseTable({
  columns,
  data,
  isTeacher = false,
  onAdd,
  onDelete,
}: CourseTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <div className="min-w-[600px]">
        {" "}
        {/* Prevent collapsing too much */}
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx} className="text-sm whitespace-nowrap">
                  {col}
                </TableHead>
              ))}
              {isTeacher && (
                <TableHead className="text-right text-sm whitespace-nowrap">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="text-sm whitespace-nowrap">
                  {course.name}
                </TableCell>
                {isTeacher ? (
                  <>
                    <TableCell className="text-sm whitespace-nowrap">
                      {course.studentsEnrolled}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {course.price}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="text-sm whitespace-nowrap">
                      {course.lessonsCompleted} / {course.totalLessons}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {course.price}
                    </TableCell>
                  </>
                )}
                {isTeacher && (
                  <TableCell className="text-right whitespace-nowrap space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAdd?.(course.id)}
                    >
                      Add
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete?.(course.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
