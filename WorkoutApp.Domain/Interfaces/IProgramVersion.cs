using System;
using System.Collections.Generic;
using System.Text;
using WorkoutApp.Domain;

namespace WorkoutApp.Infrastructure
{
    public interface IProgramVersionRepo
    {
        IEnumerable<Program_Version> GetProgramVersion( int Program_id);
        IEnumerable<Excercise> GetProgramVersionExcercises( int Program_Version_Id);       
    }
}
