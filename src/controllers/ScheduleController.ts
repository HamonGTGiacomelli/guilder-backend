import Schedule, { ScheduleInterface } from '../schemas/Schedule';

class ScheduleController {
  findById(id: string) {
    return Schedule.findById(id);
  }

  async create(schedule: ScheduleInterface) {
    return await Schedule.create(schedule);
  }

  async remove(schedule: ScheduleInterface) {
    return await Schedule.deleteOne({ _id: schedule._id });
  }
}

export default new ScheduleController();
