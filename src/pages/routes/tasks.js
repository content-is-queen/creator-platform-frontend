import TasksActivities from '../../modules/Activities/TasksActivities';

const TasksRoute = {
  title: 'Task - List',
  protected: true,
  guestOnly: false,
  path: '/',
  component: TasksActivities,
};

export default TasksRoute;
