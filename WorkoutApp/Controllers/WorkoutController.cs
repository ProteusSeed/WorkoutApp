using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
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
        public ActionResult<Workout_Excercise> CreateWorkoutExcercise([FromBody][BindRequired]Workout_Excercise WorkoutExcerciseData) 
        {
            if (ModelState.IsValid)
            {
                WorkoutExcerciseRepo.CreateWorkout(WorkoutExcerciseData);
                return WorkoutExcerciseData;
            }
            else
            {
                return new BadRequestObjectResult(ModelState);
            }
            
        }

    }
}