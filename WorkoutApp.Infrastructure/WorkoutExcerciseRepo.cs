using System;
using System.Data.SqlClient;
using WorkoutApp.Domain;
using WorkoutApp.Domain.Interfaces;
using Dapper;
using System.Data;

namespace WorkoutApp.Infrastructure
{
    public class WorkoutExcerciseRepo : IWorkoutExcerciseRepo
    {
        private readonly IDbConnection DbConnection;

        public WorkoutExcerciseRepo(IDbConnection DbConnection)
        {
            this.DbConnection = DbConnection;
        }

        public void CreateWorkout(Workout_Excercise WorkoutExcercise)
        {

           DbConnection.Execute(@"INSERT Workout_Excercise VALUES(@Workout_DateTime, @Program_Version_Id, @Excercise_Id, @Weight, @Set_Number, @Rep_Number, @Workout_Excercise_Note )",
                            WorkoutExcercise
                            );

            //throw new NotImplementedException();
        }


    }
}
