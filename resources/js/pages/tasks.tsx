import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '@/types/task';
import { taskService } from '@/services/taskService';
import { TaskList } from '@/components/task-list';
import { TaskForm } from '@/components/task-form';
import { Toast } from '@/components/toast';
import Heading from '@/components/heading';
import { Alert } from '@/components/ui/alert';
import { Icon } from '@/components/icon';
import { AlertCircle, LoaderCircle } from 'lucide-react';

type ToastType = {
  message: string;
  type: 'success' | 'error' | 'info';
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastType | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Erro ao carregar tarefas. Verifique se o backend está rodando.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data: TaskFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const newTask = await taskService.createTask(data);
      setTasks([newTask, ...tasks]);
      setToast({ message: 'Tarefa criada com sucesso!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Erro ao criar tarefa. Tente novamente.', type: 'error' });
      console.error('Error creating task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!editingTask) return;

    try {
      setIsSubmitting(true);
      setError(null);
      const updatedTask = await taskService.updateTask(editingTask.id, data);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      setEditingTask(null);
      setToast({ message: 'Tarefa atualizada com sucesso!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Erro ao atualizar tarefa. Tente novamente.', type: 'error' });
      console.error('Error updating task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm('Deseja realmente excluir esta tarefa?')) return;

    try {
      setError(null);
      await taskService.deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
      setToast({ message: 'Tarefa excluída com sucesso!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Erro ao excluir tarefa. Tente novamente.', type: 'error' });
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      setError(null);
      const updatedTask = await taskService.updateTask(task.id, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      setToast({
        message: updatedTask.completed ? 'Tarefa marcada como concluída!' : 'Tarefa marcada como pendente!',
        type: 'success',
      });
    } catch (err) {
      setToast({ message: 'Erro ao atualizar status da tarefa.', type: 'error' });
      console.error('Error toggling task:', err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Heading
        title="Gerenciador de Tarefas"
        description="Organize suas atividades de forma eficiente"
      />

      {error && (
        <Alert variant="destructive" className="mb-6">
          <Icon iconNode={AlertCircle} className="h-4 w-4" />
          <div className="ml-2">{error}</div>
        </Alert>
      )}

      <div className="mb-8">
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={editingTask ? handleCancelEdit : undefined}
          isLoading={isSubmitting}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Icon iconNode={LoaderCircle} className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground mt-2">Carregando tarefas...</p>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
}
