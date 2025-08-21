import TaskTabs from '../components/TaskTabs';
import DebugInfo from '../components/DebugInfo';

export default function Home() {
  return (
    <div className="container">
      <h1>Менеджер задач</h1>
      <TaskTabs />
      
      {/* Отладочная информация - можно удалить после настройки */}
      <DebugInfo />
    </div>
  );
}