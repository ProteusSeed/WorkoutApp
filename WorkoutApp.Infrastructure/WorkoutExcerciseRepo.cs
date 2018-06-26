using System;
using System.Data.SqlClient;
using WorkoutApp.Domain;
using WorkoutApp.Domain.Interfaces;
using Dapper;
using System.Data;
//using WorkoutApp.Web;

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
            //using (IDbConnection db = new SqlConnection(config.Value.WorkoutAppDB_CS))
            //{
            //    db.Execute(@"INSERT Workout_Excercise VALUES(@Workout_DateTime, @Program_Version_Id, @Excercise_Id, @Weight, @Set_Number, @Rep_Number, @Workout_Excercise_Note )",
            //                WorkoutExcercise
            //                );

            //}

            DbConnection.Execute(@"INSERT Workout_Excercise VALUES(@Workout_DateTime, @Program_Version_Id, @Excercise_Id, @Weight, @Set_Number, @Rep_Number, @Workout_Excercise_Note )",
                            WorkoutExcercise
                            );

            //throw new NotImplementedException();
        }


    }
}
