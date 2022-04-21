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

  async accept(scheduleId: string, characterId?: string) {
    if (characterId) {
      return Schedule.updateOne(
        { _id: scheduleId },
        {
          $push: {
            accepted: characterId,
          },
          $pull: {
            rejected: characterId,
          },
        }
      );
    }
    return Schedule.updateOne(
      { _id: scheduleId },
      {
        isMasterAccepted: true,
      }
    );
  }

  async reject(scheduleId: string, characterId?: string) {
    if (characterId) {
      return Schedule.updateOne(
        { _id: scheduleId },
        {
          $push: {
            rejected: characterId,
          },
          $pull: {
            accepted: characterId,
          },
        }
      );
    }
    return Schedule.updateOne(
      { _id: scheduleId },
      {
        isMasterAccepted: false,
      }
    );
  }
}

export default new ScheduleController();
