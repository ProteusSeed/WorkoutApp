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

        public IEnumerable<Excercise> GetExcercise()
        {
            var Excercises = DbConnection.Query<Excercise>("SELECT * FROM dbo.Excercise;");

            return Excercises;
        }
    }
}
