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

        public IEnumerable<Program_Version> GetProgramVersion(int Program_Id)
        {
            string sql = @"SELECT PV.*
                                ,PV.Program_Version_Id
                                ,PV.Program_Version_Desc
                                ,PV.Program_Version_Date_Active
                            FROM dbo.Program_Version PV
                            JOIN dbo.Program P
                                ON PV.Program_Id = P.Program_Id
                            WHERE Program_Id = @Program_Id;";
            var programVersions = DbConnection.Query<Program_Version>(sql, new { Program_Id });

            return programVersions;
        }

        //see: https://stackoverflow.com/questions/28678442/how-can-i-make-dapper-net-throw-when-result-set-has-unmapped-columns/39490419#39490419
        public IEnumerable<Excercise> GetProgramVersionExcercises( int Program_Version_Id)
        {
            string sql = @"SELECT E.Excercise_Id, E.Excercise_Name, E.Excercise_Desc 
                            FROM dbo.Program_Version_Excercise PE
                            JOIN dbo.Excercise E
                                ON PE.Excercise_Id = E.Excercise_Id
                            WHERE Program_Version_Id = @Program_Version_Id;";
            var excercises = DbConnection.Query<Excercise>(sql, new { Program_Version_Id });

            return excercises;
        }

    }
}
