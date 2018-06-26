using System;
using System.Collections.Generic;
using System.Text;

namespace WorkoutApp.Domain.Interfaces
{
    public interface IWorkoutExcerciseRepo
    {
        void CreateWorkout(Workout_Excercise WorkoutExcercise);
    }
}
