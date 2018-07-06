using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using WorkoutApp.Domain;
using WorkoutApp.Domain.Interfaces;

namespace WorkoutApp.Infrastructure
{
    public class ProgramVerisonRepo : IProgramVersionRepo
    {
        private readonly IDbConnection DbConnection;

        public ProgramVerisonRepo(IDbConnection DbConnection)
        {
            this.DbConnection = DbConnection;
        }

        public IEnumerable<Excercise> GetProgramVersionExcercises( int Program_Version_Id)
        {
            string sql = @"SELECT E.Excercise_Name, E.Excercise_Desc 
                            FROM dbo.Program_Version_Excercise PE
                            JOIN dbo.Excercise E
                                ON PE.Excercise_Id = E.Excercise_Id
                            WHERE Program_Version_Id = @Program_Version_Id;";
            var excercises = DbConnection.Query<Excercise>(sql, new { Program_Version_Id });

            return excercises;
        }

    }
}
