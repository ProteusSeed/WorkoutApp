using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkoutApp.Domain;
using WorkoutApp.Domain.Interfaces;

namespace WorkoutApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class WorkoutController : Controller
    {
        private readonly IWorkoutExcerciseRepo WorkoutExcerciseRepo;
        public WorkoutController(IWorkoutExcerciseRepo WorkoutExcerciseRepo)
        {
            this.WorkoutExcerciseRepo = WorkoutExcerciseRepo;
        }

        [HttpPost("CreateWorkoutExcercise")]
        public ActionResult<Workout_Excercise> CreateWorkoutExcercise([FromBody]Workout_Excercise WorkoutExcerciseData) 
        {

            WorkoutExcerciseRepo.CreateWorkout(WorkoutExcerciseData);

            return WorkoutExcerciseData;
        }

    }
}