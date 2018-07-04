using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using WorkoutApp.Domain.Interfaces;
using WorkoutApp.Domain;
using Dapper;

namespace WorkoutApp.Infrastructure
{
    class ExcerciseRepo : IExcerciseRepo
    {
        private readonly IDbConnection DbConnection;

        public ExcerciseRepo(IDbConnection DbConnection)
        {
            this.DbConnection = DbConnection;
        }

        public IList<Excercise> GetExcercise()
        {
            IList<Excercise> Excercises;
            Excercises = DbConnection.Query<Excercise>("SELECT * FROM dbo.Excercise;").AsList<Excercise>();

            return Excercises;
        }
    }
}
