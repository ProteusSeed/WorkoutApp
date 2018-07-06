using System;
using System.Collections.Generic;
using System.Text;
using WorkoutApp.Domain;

namespace WorkoutApp.Infrastructure
{
    public interface IProgramVersionRepo
    {
        IEnumerable<Excercise> GetProgramVersionExcercises( int Program_Version_Id);    
    }
}
