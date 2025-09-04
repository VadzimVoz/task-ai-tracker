import TaskTabs from '../components/TaskTabs';
import DebugInfo from '../components/DebugInfo';
import '../styles/layout.css';
import '../styles/typography.css';
import '../styles/tasks.css';
import '../styles/reminders.css';
import '../styles/states.css';
import '../styles/datepicker.css'

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