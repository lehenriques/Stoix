import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/icon';
import { Pencil, Trash2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (task: Task) => void;
}

export function TaskList({ tasks, onEdit, onDelete, onToggleComplete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nenhuma tarefa encontrada. Crie sua primeira tarefa!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-shrink-0 pt-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleComplete(task)}
                aria-label={`Marcar tarefa "${task.title}" como ${task.completed ? 'pendente' : 'concluída'}`}
              />
            </div>

            <div className="flex-1 min-w-0 w-full sm:w-auto">
              <h3 className={`font-semibold text-base sm:text-lg break-words ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 break-words ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                  {task.description}
                </p>
              )}
              <div className="flex flex-wrap gap-2 items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Criada em: {new Date(task.created_at).toLocaleString('pt-BR')}
                </p>
                {task.completed && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Concluída
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(task)}
                title="Editar tarefa"
                className="flex-1 sm:flex-none"
              >
                <Icon iconNode={Pencil} className="h-4 w-4 sm:mr-0" />
                <span className="ml-2 sm:hidden">Editar</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(task.id)}
                title="Excluir tarefa"
                className="flex-1 sm:flex-none hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <Icon iconNode={Trash2} className="h-4 w-4 sm:mr-0" />
                <span className="ml-2 sm:hidden">Excluir</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
